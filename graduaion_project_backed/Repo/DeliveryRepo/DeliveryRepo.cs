using Shippingproject.Model;
using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class DeliveryRepo : IDeliveryRepo
    {
        private readonly ShippingDB db;

        public DeliveryRepo(ShippingDB db)
        {
            this.db = db;
        }

        public List<Delivery> GetAll()
        {
            return db.Deliveries.ToList();
        }

        public Delivery GetById(int id)
        {
            return db.Deliveries.Where(B => B.Id == id).SingleOrDefault();
        }

        public int Add(Delivery delivery)
        {
            db.Deliveries.Add(delivery);
            return db.SaveChanges();

        }

        public int Update(int id, Delivery delivery)
        {
            Delivery OldDelivery = GetById(id);
            if (OldDelivery != null)
            {
                OldDelivery.DeliveryName = delivery.DeliveryName;

            }
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
            Delivery delivery = GetById(id);
            if (delivery != null)
            {
                db.Deliveries.Remove(delivery);
            }
            return db.SaveChanges();
        }



    }
}
