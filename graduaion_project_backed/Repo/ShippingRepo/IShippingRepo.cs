
using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IShippingRepo
    {
        int Add(TypeOfShipping Shipping);
        int Delete(int id);
        List<TypeOfShipping> GetAll();
        TypeOfShipping GetById(int id);
        int Update(int id, TypeOfShipping Shipping);
    }
}