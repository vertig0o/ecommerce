using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data;


public static class SeedDatabase

{
    public static async void Initialize(IApplicationBuilder app)
    {

        var userManager = app.ApplicationServices
                                .CreateScope()
                                .ServiceProvider
                                .GetRequiredService<UserManager<AppUser>>();
        var roleManager = app.ApplicationServices
                                .CreateScope()
                                .ServiceProvider
                                .GetRequiredService<RoleManager<AppRole>>();
        if (!roleManager.Roles.Any())
        {

            var customer = new AppRole { Name = "Customer" };
            var admin = new AppRole { Name = "Admin" };

            await roleManager.CreateAsync(customer);
            await roleManager.CreateAsync(admin);

        }
        if (!userManager.Users.Any())
        {
            var customer = new AppUser { Name = "John Doe", UserName = "johndoe", Email = "johndoe@gmail.com" };
            var admin = new AppUser { Name = "Atılay Yörük", UserName = "atilayyoruk", Email = "atilayyoruk@gmail.com" };

            await userManager.CreateAsync(customer, "Customer_123");
            await userManager.AddToRoleAsync(customer, "Customer");

            await userManager.CreateAsync(admin, "Admin_123");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Customer" });


        }
    }
}