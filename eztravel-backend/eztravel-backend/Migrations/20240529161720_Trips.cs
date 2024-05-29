using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eztravel_backend.Migrations
{
    /// <inheritdoc />
    public partial class Trips : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TripModelId",
                table: "Transports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Activities",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "TripModelId",
                table: "Activities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Accomodations",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "TripModelId",
                table: "Accomodations",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Destination = table.Column<string>(type: "text", nullable: false),
                    ArrivalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DepartureDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    NumberOfPeople = table.Column<int>(type: "integer", nullable: false),
                    Budget = table.Column<double>(type: "double precision", nullable: false),
                    BudgetNotEnough = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transports_TripModelId",
                table: "Transports",
                column: "TripModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TripModelId",
                table: "Activities",
                column: "TripModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Accomodations_TripModelId",
                table: "Accomodations",
                column: "TripModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accomodations_Trips_TripModelId",
                table: "Accomodations",
                column: "TripModelId",
                principalTable: "Trips",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Trips_TripModelId",
                table: "Activities",
                column: "TripModelId",
                principalTable: "Trips",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_Trips_TripModelId",
                table: "Transports",
                column: "TripModelId",
                principalTable: "Trips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accomodations_Trips_TripModelId",
                table: "Accomodations");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Trips_TripModelId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Transports_Trips_TripModelId",
                table: "Transports");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Transports_TripModelId",
                table: "Transports");

            migrationBuilder.DropIndex(
                name: "IX_Activities_TripModelId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Accomodations_TripModelId",
                table: "Accomodations");

            migrationBuilder.DropColumn(
                name: "TripModelId",
                table: "Transports");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "TripModelId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Accomodations");

            migrationBuilder.DropColumn(
                name: "TripModelId",
                table: "Accomodations");
        }
    }
}
