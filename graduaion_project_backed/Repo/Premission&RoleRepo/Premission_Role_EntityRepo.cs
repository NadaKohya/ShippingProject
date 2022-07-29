using Shippingproject.Model;
using System.Linq;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public class Premission_Role_EntityRepo : IPremission_Role_Entityrepo
    {
        readonly ShippingDB db;

        public Premission_Role_EntityRepo(ShippingDB db)
        {
            this.db = db;
        }
        public int Add(Premission_Role_Entity New)
        {
            db.Premissions_Roles_Entities.Add(New);
            return db.SaveChanges();
        }

        public string GetRoleIdByName(string Name)
        {
            var res = db.MainRoles.FirstOrDefault(r => r.Name.Equals(Name));
            if (res != null)
                return res.Id;
            else return null;
        }


        public List<MainRole> getAllRoles()
        {
            return db.MainRoles.ToList();
        }

    }
}
