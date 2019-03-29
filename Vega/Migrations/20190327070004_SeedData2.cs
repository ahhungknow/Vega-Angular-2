using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into Features (Name) values('Feature 1')");
            migrationBuilder.Sql("Insert into Features (Name) values('Feature 2')");
            migrationBuilder.Sql("Insert into Features (Name) values('Feature 3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Features where Name in('Feature 1','Feature 2','Feature 3')");
        }
    }
}
