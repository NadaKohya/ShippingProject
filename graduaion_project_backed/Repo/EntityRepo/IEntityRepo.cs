using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IEntityRepo
    {
        List<Entity> getAll();
    }
}