using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into Makes (Name) values('Make 1')");
            migrationBuilder.Sql("Insert into Makes (Name) values('Make 2')");
            migrationBuilder.Sql("Insert into Makes (Name) values('Make 3')");


            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 1',(Select Id from Makes where Name='Make 1'))");
            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 2',(Select Id from Makes where Name='Make 2'))");
            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 3',(Select Id from Makes where Name='Make 1'))");
            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 4',(Select Id from Makes where Name='Make 3'))");
            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 5',(Select Id from Makes where Name='Make 3'))");
            migrationBuilder.Sql("Insert into Models (Name,MakeId) values('Model 6',(Select Id from Makes where Name='Make 2'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Makes where Name in('Make 1','Make 2','Make 3')");
        }
    }
}
