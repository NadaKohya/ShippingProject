
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shippingproject.Model
{
    public class Payment
    {
        public int Id { get; set; }
        [Required]
        public string PaymentType { get; set; }
        public List<Order> Orders { get; set; }

    }
}
