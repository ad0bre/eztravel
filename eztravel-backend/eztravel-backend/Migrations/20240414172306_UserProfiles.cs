using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eztravel_backend.Migrations
{
    /// <inheritdoc />
    public partial class UserProfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transports",
                newName: "ProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Activities",
                newName: "ProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Accomodations",
                newName: "ProfileId");

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Transports",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Activities",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Accomodations",
                newName: "UserId");
        }
    }
}
