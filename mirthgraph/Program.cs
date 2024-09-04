using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using mirthgraph.Components;
using Radzen;
using Serilog;
using StackExchange.Redis;
using System.Security.Cryptography.X509Certificates;

void AddTrustedRootCertificate(string certificatePath)
{
    var certificate = new X509Certificate2(certificatePath);
    using var store = new X509Store(StoreName.Root, StoreLocation.LocalMachine);
    store.Open(OpenFlags.ReadWrite);
    store.Add(certificate);
    store.Close();
}

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddRadzenComponents();
builder.Services.AddRadzenQueryStringThemeService();
builder.Services.AddControllersWithViews();

// Disable SSL certificate validation for development purposes
if (builder.Environment.IsDevelopment())
{
    HttpClientHandler clientHandler = new HttpClientHandler();
    clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
    builder.Services.AddSingleton(new HttpClient(clientHandler));
}
else
{
    builder.Services.AddHttpClient();
}


builder.Services.AddDbContext<DbService>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");

// Configure Data Protection to persist keys and use DPAPI for encryption
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(Path.Combine(builder.Environment.ContentRootPath, "keys")));

// Configure Redis connection
var redisConnection = builder.Configuration.GetConnectionString("RedisConnection");
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<Program>>();
    try
    {
        return ConnectionMultiplexer.Connect(redisConnection);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Could not connect to Redis.");
        throw;
    }
});

builder.Services.AddSingleton<CacheService>();
builder.Services.AddScoped<MirthConfigService>();
builder.Services.AddScoped<GraphsService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbService = scope.ServiceProvider.GetRequiredService<DbService>();
    if (app.Environment.IsDevelopment())
    {
        dbService.Database.EnsureCreated();
    }
    else
    {
        // For production, use migrations
        dbService.Database.Migrate();
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();

    AddTrustedRootCertificate("/var/www/certbot");
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAntiforgery();
app.MapRazorPages();
app.MapControllers();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

// Fetch and cache Mirth configurations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var cacheService = services.GetRequiredService<CacheService>();
    var configService = services.GetRequiredService<MirthConfigService>();
    var graphsService = services.GetRequiredService<GraphsService>();
    var dbContext = services.GetRequiredService<DbService>();

    var connections = await dbContext.MirthConnections.ToListAsync();
    foreach (var connection in connections)
    {
        var configContent = await configService.FetchFromMirthAsync(connection, connection.Name);
        await cacheService.CacheMirthConfigAsync(connection.Name, configContent);
        await graphsService.BuildGraphDataAsync(connection.Name);
    }
}

app.Run();