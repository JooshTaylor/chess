using Chess.Data;
using Chess.Services;
using Chess.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCorsPolicy", builder =>
    {
        builder
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var dbPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "chess.db");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite($"Data Source={dbPath}"));

builder.Services.AddScoped<IGameService, GameService>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
});

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>(opts =>
    {
        // For testing purposes, don't really care about password strength
        opts.Password.RequireDigit = false;
        opts.Password.RequireLowercase = false;
        opts.Password.RequireNonAlphanumeric = false;
        opts.Password.RequireUppercase = false;
        opts.Password.RequiredLength = 4;
        opts.User.RequireUniqueEmail = true;
        opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        opts.Lockout.MaxFailedAccessAttempts = 3;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("DevCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/api")
    .MapIdentityApi<IdentityUser>();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();