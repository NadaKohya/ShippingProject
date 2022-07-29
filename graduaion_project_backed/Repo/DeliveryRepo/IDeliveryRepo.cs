using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IDeliveryRepo
    {
        int Add(Delivery delivery);
        int Delete(int id);
        List<Delivery> GetAll();
        Delivery GetById(int id);
        int Update(int id, Delivery delivery);
    }
}