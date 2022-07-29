using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Shippingproject.Model
{
    public class ShippingDB :IdentityDbContext<ApplicationUser>


    {

        public ShippingDB()
        {

        }

        public ShippingDB(DbContextOptions options):base(options) 
        {


        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source =.; Initial Catalog = ShippingProject; Integrated Security = True");
            base.OnConfiguring(optionsBuilder);
        }

        public virtual DbSet<Entity> Entities { get; set; }
        public virtual DbSet<Premssion> Premssions { get; set; }
        public virtual DbSet<Premission_Role_Entity> Premissions_Roles_Entities { get; set; }
        public virtual DbSet<MainRole> MainRoles { get; set; }
        public virtual DbSet<Branches> Branches { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
        public virtual DbSet<TypeOfShipping> Shippings { get; set; }
        public virtual DbSet<WeightSetting> WeightSettings { get; set; }
    }
}
