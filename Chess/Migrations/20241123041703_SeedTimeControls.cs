using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class SeedTimeControls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TimeControls",
                columns: new[] { "Increment", "Time", "Type" },
                values: new object[,]
                {
                    { 0ul, 100000ul, 0 },
                    { 1000ul, 100000ul, 0 },
                    { 0ul, 180000ul, 1 },
                    { 2000ul, 180000ul, 1 },
                    { 1000ul, 200000ul, 0 },
                    { 0ul, 300000ul, 1 },
                    { 0ul, 600000ul, 2 },
                    { 10000ul, 900000ul, 2 },
                    { 0ul, 1800000ul, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 0ul, 100000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 1000ul, 100000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 0ul, 180000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 2000ul, 180000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 1000ul, 200000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 0ul, 300000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 0ul, 600000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 10000ul, 900000ul });

            migrationBuilder.DeleteData(
                table: "TimeControls",
                keyColumns: new[] { "Increment", "Time" },
                keyValues: new object[] { 0ul, 1800000ul });
        }
    }
}
