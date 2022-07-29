using Shippingproject.Model;
using System.Collections.Generic;
using System.Linq;
namespace Shippingproject.Repo
{
    public class EntityRepo : IEntityRepo
    {
        private readonly ShippingDB db;

        public EntityRepo(ShippingDB db)
        {
            this.db = db;
        }

        public List<Entity> getAll()
        {
            return db.Entities.ToList();
        }
    }
}
