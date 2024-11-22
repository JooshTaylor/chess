using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class TimeControlCompositeKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_TimeControls_TimeControlType",
                table: "Games");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeControls",
                table: "TimeControls");

            migrationBuilder.DropIndex(
                name: "IX_Games_TimeControlType",
                table: "Games");

            migrationBuilder.RenameColumn(
                name: "TimeControlType",
                table: "Games",
                newName: "TimeControlTime");

            migrationBuilder.AddColumn<ulong>(
                name: "TimeControlIncrement",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0ul);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeControls",
                table: "TimeControls",
                columns: new[] { "Time", "Increment" });

            migrationBuilder.CreateIndex(
                name: "IX_Games_TimeControlTime_TimeControlIncrement",
                table: "Games",
                columns: new[] { "TimeControlTime", "TimeControlIncrement" });

            migrationBuilder.AddForeignKey(
                name: "FK_Games_TimeControls_TimeControlTime_TimeControlIncrement",
                table: "Games",
                columns: new[] { "TimeControlTime", "TimeControlIncrement" },
                principalTable: "TimeControls",
                principalColumns: new[] { "Time", "Increment" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_TimeControls_TimeControlTime_TimeControlIncrement",
                table: "Games");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeControls",
                table: "TimeControls");

            migrationBuilder.DropIndex(
                name: "IX_Games_TimeControlTime_TimeControlIncrement",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "TimeControlIncrement",
                table: "Games");

            migrationBuilder.RenameColumn(
                name: "TimeControlTime",
                table: "Games",
                newName: "TimeControlType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeControls",
                table: "TimeControls",
                column: "Type");

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
    }
}
