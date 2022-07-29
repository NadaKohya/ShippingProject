using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IPaymentRepo
    {
        int Add(Payment payment);
        int Delete(int id);
        List<Payment> GetAll();
        Payment GetById(int id);
        int Update(int id, Payment payment);
    }
}