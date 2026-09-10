using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Nasps.Api.Data;

#nullable disable

namespace Nasps.Api.Migrations;

[DbContext(typeof(NaspsDbContext))]
[Migration("20260909120000_AddStoredFilesAndProfilePhoto")]
public partial class AddStoredFilesAndProfilePhoto : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<byte[]>(name: "AttachmentContent", table: "Tasks", type: "varbinary(max)", nullable: true);
        migrationBuilder.AddColumn<byte[]>(name: "SubmissionContent", table: "Tasks", type: "varbinary(max)", nullable: true);
        migrationBuilder.AddColumn<string>(name: "SubmissionLink", table: "Tasks", type: "nvarchar(max)", nullable: true);
        migrationBuilder.AddColumn<byte[]>(name: "ProfilePhotoContent", table: "Users", type: "varbinary(max)", nullable: true);
        migrationBuilder.AddColumn<string>(name: "ProfilePhotoName", table: "Users", type: "nvarchar(max)", nullable: true);
        migrationBuilder.AddColumn<string>(name: "ProfilePhotoType", table: "Users", type: "nvarchar(max)", nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(name: "AttachmentContent", table: "Tasks");
        migrationBuilder.DropColumn(name: "SubmissionContent", table: "Tasks");
        migrationBuilder.DropColumn(name: "SubmissionLink", table: "Tasks");
        migrationBuilder.DropColumn(name: "ProfilePhotoContent", table: "Users");
        migrationBuilder.DropColumn(name: "ProfilePhotoName", table: "Users");
        migrationBuilder.DropColumn(name: "ProfilePhotoType", table: "Users");
    }
}
