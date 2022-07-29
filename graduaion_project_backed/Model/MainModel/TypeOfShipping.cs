

using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Shippingproject.Model
{
    public class TypeOfShipping
    {
        public int Id { get; set; }
        [Required]
        public string ShipName { get; set;}
        public List<Order> Orders { get; set; }
    }
}
