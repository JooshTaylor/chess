using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTimeRemaining : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeRemainingBlack",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "TimeRemainingWhite",
                table: "Games");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
