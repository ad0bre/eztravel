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

            migrationBuilder.AddColumn<string>(
                name: "ProfileId",
                table: "Activities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileId",
                table: "Accomodations",
                type: "text",
                nullable: true);

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

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Accomodations");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Transports",
                newName: "UserId");
        }
    }
}
