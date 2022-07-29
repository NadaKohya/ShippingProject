

using Shippingproject.Model;

using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class PaymentRepo : IPaymentRepo
    {
        private readonly ShippingDB db;

        public PaymentRepo(ShippingDB db)
        {
            this.db = db;
        }

        public List<Payment> GetAll()
        {
            return db.Payments.ToList();
        }

        public Payment GetById(int id)
        {
            return db.Payments.Where(B => B.Id == id).SingleOrDefault();
        }

        public int Add(Payment payment)
        {
            db.Payments.Add(payment);
            return db.SaveChanges();

        }

        public int Update(int id, Payment payment)
        {
            Payment OldPayment = GetById(id);
            if (OldPayment != null)
            {
                OldPayment.PaymentType = payment.PaymentType;
            }
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
            Payment payment = GetById(id);
            if (payment != null)
            {
                db.Payments.Remove(payment);
            }
            return db.SaveChanges();
        }
    }
}
