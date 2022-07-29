using System.ComponentModel.DataAnnotations.Schema;

namespace Shippingproject.Model
{
    public class Premission_Role_Entity
    {
        public int Id { get; set; }
        [ForeignKey("entity")]
        public int EntityId { get; set; }
        public Entity entity { get; set; }
        [ForeignKey("premssion")]
        public int PremissionId{ get; set; }
        public Premssion premssion { get; set; }
        [ForeignKey("MainRole")]
        public string MainRoleId { get; set; }
        public MainRole MainRole { get; set; }
    }
}
