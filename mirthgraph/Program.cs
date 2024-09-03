using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using mirthgraph.Components;
using Radzen;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddRadzenComponents();
builder.Services.AddRadzenQueryStringThemeService();
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
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
builder.Services.AddSingleton<MirthConfigService>();
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
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAntiforgery();
app.MapRazorPages();
app.MapControllers();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
app.MapControllers();

app.Run();