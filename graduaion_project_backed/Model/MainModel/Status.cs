using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shippingproject.Model
{
    public class Status
    {
        [Key]
        public int Id { get; set; }
        public string StatusName { get; set; }
        public virtual List<Order> Order { get; set; } = new List<Order>();

    }
}
