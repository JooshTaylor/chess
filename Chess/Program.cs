using Chess.Data;
using Chess.Hubs;
using Chess.Services;
using Chess.Services.Interfaces;
using Chess.Utilities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new KebabCaseEnumConverterFactory());
    });

builder.Services.AddSignalR();

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

var folder = Environment.SpecialFolder.MyDocuments;
var path = Environment.GetFolderPath(folder);
var dbPath = Path.Join(path, "chess.db");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite($"Data Source={dbPath}"));

builder.Services.AddScoped<IGameService, GameService>();

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

app.MapHub<GameHub>("/gameHub");

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();