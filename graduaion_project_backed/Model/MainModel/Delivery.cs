
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shippingproject.Model
{
    public class Delivery
    {
        public int Id { get; set; }
        [Required]
        public string DeliveryName { get; set; }
        public List<Order> Orders { get; set; }

    }
}
