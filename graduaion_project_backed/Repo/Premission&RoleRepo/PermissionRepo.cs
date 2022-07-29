using Shippingproject.Model;
using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class PermissionRepo:IPermission
    {
        private readonly ShippingDB db;

        public PermissionRepo(ShippingDB db)
        {
            this.db = db;
        }

        public List<Premssion> getAll()
        {
            return db.Premssions.ToList();
        }
    }
}
