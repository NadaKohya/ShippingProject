using Shippingproject.Dto;
using Shippingproject.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class RolReops : IRolReops
    {
        readonly ShippingDB db;
        public RolReops(ShippingDB db)
        {
            this.db = db;
        }
        public List<RoleDTO> GetAll()
        {
            List<MainRole> RoleList = db.MainRoles.ToList();
            List<RoleDTO> RoleDTOList = new List<RoleDTO>();
            foreach (MainRole Role in RoleList)
            {
                RoleDTO roleDTO1 = new RoleDTO();
                roleDTO1.RoleName = Role.Name;
                RoleDTOList.Add(roleDTO1);

            }
            return RoleDTOList;
        }

    }
}
