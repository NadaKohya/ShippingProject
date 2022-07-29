using Shippingproject.Model;
using System.Collections.Generic;

namespace ShippingProject.Dto
{
    public class OrdersPageCounterDTO
    {
        public List<Order> orders { get; set; }
        public int count { get; set; }
    }
}
