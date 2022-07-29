
using Shippingproject.Model;

using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class ShippingRepo : IShippingRepo
    {
        private readonly ShippingDB db;

        public ShippingRepo(ShippingDB db)
        {
            this.db = db;
        }

        public List<TypeOfShipping> GetAll()
        {
            return db.Shippings.ToList();
        }

        public TypeOfShipping GetById(int id)
        {
            return db.Shippings.Where(B => B.Id == id).SingleOrDefault();
        }

        public int Add(TypeOfShipping Shipping)
        {
            db.Shippings.Add(Shipping);
            return db.SaveChanges();

        }

        public int Update(int id, TypeOfShipping Shipping)
        {
            TypeOfShipping OldShipping = GetById(id);
            if (OldShipping != null)
            {
                OldShipping.ShipName = Shipping.ShipName;

            }
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
            TypeOfShipping Shipping = GetById(id);
            if (Shipping != null)
            {
                db.Shippings.Remove(Shipping);
            }
            return db.SaveChanges();
        }

       
    }
}
