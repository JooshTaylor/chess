using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class AddGameMetadata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ending",
                table: "Games",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TimeControlType",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<ulong>(
                name: "TimeRemainingBlack",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0ul);

            migrationBuilder.AddColumn<ulong>(
                name: "TimeRemainingWhite",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0ul);

            migrationBuilder.AddColumn<int>(
                name: "Winner",
                table: "Games",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TimeControls",
                columns: table => new
                {
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Time = table.Column<ulong>(type: "INTEGER", nullable: false),
                    Increment = table.Column<ulong>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeControls", x => x.Type);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Games_TimeControlType",
                table: "Games",
                column: "TimeControlType");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_TimeControls_TimeControlType",
                table: "Games",
                column: "TimeControlType",
                principalTable: "TimeControls",
                principalColumn: "Type",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_TimeControls_TimeControlType",
                table: "Games");

            migrationBuilder.DropTable(
                name: "TimeControls");

            migrationBuilder.DropIndex(
                name: "IX_Games_TimeControlType",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Ending",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "TimeControlType",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "TimeRemainingBlack",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "TimeRemainingWhite",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Winner",
                table: "Games");
        }
    }
}
