using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeControls",
                columns: table => new
                {
                    Time = table.Column<ulong>(type: "INTEGER", nullable: false),
                    Increment = table.Column<ulong>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeControls", x => new { x.Time, x.Increment });
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<ulong>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Ending = table.Column<int>(type: "INTEGER", nullable: true),
                    Winner = table.Column<int>(type: "INTEGER", nullable: true),
                    TimeRemainingWhite = table.Column<ulong>(type: "INTEGER", nullable: false),
                    TimeRemainingBlack = table.Column<ulong>(type: "INTEGER", nullable: false),
                    TimeControlTime = table.Column<ulong>(type: "INTEGER", nullable: false),
                    TimeControlIncrement = table.Column<ulong>(type: "INTEGER", nullable: false),
                    PlayerOneId = table.Column<Guid>(type: "TEXT", nullable: true),
                    PlayerTwoId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Games_TimeControls_TimeControlTime_TimeControlIncrement",
                        columns: x => new { x.TimeControlTime, x.TimeControlIncrement },
                        principalTable: "TimeControls",
                        principalColumns: new[] { "Time", "Increment" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Games_TimeControlTime_TimeControlIncrement",
                table: "Games",
                columns: new[] { "TimeControlTime", "TimeControlIncrement" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "TimeControls");
        }
    }
}
