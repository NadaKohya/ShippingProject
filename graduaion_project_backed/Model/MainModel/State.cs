using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shippingproject.Model
{
    public class State
    {
        [Key]
        public int Id { get; set; }
        public string StateName { get; set; }
        public virtual List<Order> Order { get; set; } = new List<Order>();
        public virtual List<City> Cities { get; set; } = new List<City>();

    }
}
