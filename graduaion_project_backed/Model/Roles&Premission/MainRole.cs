using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Shippingproject.Model
{
    public class MainRole:IdentityRole
    {
        public virtual List<Premission_Role_Entity> PremissionRoleControllers { get; set; }
         = new List<Premission_Role_Entity>();
    }
}
