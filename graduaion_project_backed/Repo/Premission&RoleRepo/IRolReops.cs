using Shippingproject.Dto;
using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IRolReops
    {
        List<RoleDTO> GetAll();
    }
}