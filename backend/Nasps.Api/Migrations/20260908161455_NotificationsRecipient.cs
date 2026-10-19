using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nasps.Api.Migrations
{
    /// <inheritdoc />
    public partial class NotificationsRecipient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_TraineeId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_TraineeId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "TraineeId",
                table: "Notifications",
                newName: "TaskId");

            migrationBuilder.AddColumn<int>(
                name: "RecipientId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_RecipientId",
                table: "Notifications",
                column: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_RecipientId",
                table: "Notifications",
                column: "RecipientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_RecipientId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_RecipientId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "TaskId",
                table: "Notifications",
                newName: "TraineeId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_TraineeId",
                table: "Notifications",
                column: "TraineeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_TraineeId",
                table: "Notifications",
                column: "TraineeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
