using Microsoft.EntityFrameworkCore;
using mirthgraph.Components;
using Radzen;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddServerSideBlazor();
builder.Services.AddRadzenComponents();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddDbContext<DbService>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var redisConnection = builder.Configuration.GetConnectionString("RedisConnection");
var redis = ConnectionMultiplexer.Connect(redisConnection);

builder.Services.AddSingleton<IConnectionMultiplexer>(redis);
builder.Services.AddSingleton<CacheService>();
builder.Services.AddSingleton<MirthConfigService>();
builder.Services.AddScoped<GraphsService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbService = scope.ServiceProvider.GetRequiredService<DbService>();
    dbService.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapControllers();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
