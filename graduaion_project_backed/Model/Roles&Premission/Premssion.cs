using System.Collections.Generic;

namespace Shippingproject.Model
{
    public class Premssion
    {
        public int Id { get; set; }
        public string PremssionName { get; set; }
        public virtual List<Premission_Role_Entity> PremissionRoleControllers { get; set; }
          = new List<Premission_Role_Entity>();
    }
}
