using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Chess.Migrations
{
    /// <inheritdoc />
    public partial class AddPiecesAndMoves : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pieces",
                columns: table => new
                {
                    InitialX = table.Column<int>(type: "INTEGER", nullable: false),
                    InitialY = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Colour = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pieces", x => new { x.InitialX, x.InitialY });
                });

            migrationBuilder.CreateTable(
                name: "GamePieces",
                columns: table => new
                {
                    Id = table.Column<ulong>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PieceInitialX = table.Column<int>(type: "INTEGER", nullable: false),
                    PieceInitialY = table.Column<int>(type: "INTEGER", nullable: false),
                    X = table.Column<int>(type: "INTEGER", nullable: false),
                    Y = table.Column<int>(type: "INTEGER", nullable: false),
                    PromotionType = table.Column<int>(type: "INTEGER", nullable: true),
                    TotalMoves = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    GameId = table.Column<ulong>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GamePieces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GamePieces_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GamePieces_Pieces_PieceInitialX_PieceInitialY",
                        columns: x => new { x.PieceInitialX, x.PieceInitialY },
                        principalTable: "Pieces",
                        principalColumns: new[] { "InitialX", "InitialY" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Moves",
                columns: table => new
                {
                    Id = table.Column<ulong>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GameId = table.Column<ulong>(type: "INTEGER", nullable: false),
                    PieceId = table.Column<ulong>(type: "INTEGER", nullable: false),
                    X = table.Column<int>(type: "INTEGER", nullable: false),
                    Y = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Moves_GamePieces_PieceId",
                        column: x => x.PieceId,
                        principalTable: "GamePieces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Moves_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Pieces",
                columns: new[] { "InitialX", "InitialY", "Colour", "Type" },
                values: new object[,]
                {
                    { 1, 1, 1, 2 },
                    { 1, 2, 1, 5 },
                    { 1, 7, 0, 5 },
                    { 1, 8, 0, 2 },
                    { 2, 1, 1, 4 },
                    { 2, 2, 1, 5 },
                    { 2, 7, 0, 5 },
                    { 2, 8, 0, 4 },
                    { 3, 1, 1, 3 },
                    { 3, 2, 1, 5 },
                    { 3, 7, 0, 5 },
                    { 3, 8, 0, 3 },
                    { 4, 1, 1, 1 },
                    { 4, 2, 1, 5 },
                    { 4, 7, 0, 5 },
                    { 4, 8, 0, 1 },
                    { 5, 1, 1, 0 },
                    { 5, 2, 1, 5 },
                    { 5, 7, 0, 5 },
                    { 5, 8, 0, 0 },
                    { 6, 1, 1, 3 },
                    { 6, 2, 1, 5 },
                    { 6, 7, 0, 5 },
                    { 6, 8, 0, 3 },
                    { 7, 1, 1, 4 },
                    { 7, 2, 1, 5 },
                    { 7, 7, 0, 5 },
                    { 7, 8, 0, 4 },
                    { 8, 1, 1, 2 },
                    { 8, 2, 1, 5 },
                    { 8, 7, 0, 5 },
                    { 8, 8, 0, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_GamePieces_GameId",
                table: "GamePieces",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_GamePieces_PieceInitialX_PieceInitialY",
                table: "GamePieces",
                columns: new[] { "PieceInitialX", "PieceInitialY" });

            migrationBuilder.CreateIndex(
                name: "IX_Moves_GameId",
                table: "Moves",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Moves_PieceId",
                table: "Moves",
                column: "PieceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Moves");

            migrationBuilder.DropTable(
                name: "GamePieces");

            migrationBuilder.DropTable(
                name: "Pieces");
        }
    }
}
