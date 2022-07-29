using System;

namespace Shippingproject.Dto
{
    public class OrderDTO
    {
        public  int cityId { get; set; }
        public  int stateId { get; set; }
        public  int statusId { get; set; }
        public int paymentId { get; set; }
        public int shippingId { get; set; }
        public int deliveryId { get; set; }
        public  string ClientName { get; set; } 
        public string ClientPhone { get; set; }
        public  string userId { get; set; }
        public decimal cost { get; set; }
        public DateTime Date { get; set; }

    }
}
