using System.Collections.Generic;

namespace Shippingproject.Model
{
    public class Entity
    {
        public int Id { get; set; }
        public string EntityName { get; set; }
        public virtual List<Premission_Role_Entity> PremissionRoleControllers { get; set; }
            =new List<Premission_Role_Entity>();
    }
}
