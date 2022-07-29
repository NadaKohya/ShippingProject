using Microsoft.EntityFrameworkCore.Migrations;

namespace ShippingProject.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Premissions_Roles_Entities_Premssions_Premission",
                table: "Premissions_Roles_Entities");

            migrationBuilder.RenameColumn(
                name: "Premission",
                table: "Premissions_Roles_Entities",
                newName: "PremissionId");

            migrationBuilder.RenameIndex(
                name: "IX_Premissions_Roles_Entities_Premission",
                table: "Premissions_Roles_Entities",
                newName: "IX_Premissions_Roles_Entities_PremissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Premissions_Roles_Entities_Premssions_PremissionId",
                table: "Premissions_Roles_Entities",
                column: "PremissionId",
                principalTable: "Premssions",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Premissions_Roles_Entities_Premssions_PremissionId",
                table: "Premissions_Roles_Entities");

            migrationBuilder.RenameColumn(
                name: "PremissionId",
                table: "Premissions_Roles_Entities",
                newName: "Premission");

            migrationBuilder.RenameIndex(
                name: "IX_Premissions_Roles_Entities_PremissionId",
                table: "Premissions_Roles_Entities",
                newName: "IX_Premissions_Roles_Entities_Premission");

            migrationBuilder.AddForeignKey(
                name: "FK_Premissions_Roles_Entities_Premssions_Premission",
                table: "Premissions_Roles_Entities",
                column: "Premission",
                principalTable: "Premssions",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
