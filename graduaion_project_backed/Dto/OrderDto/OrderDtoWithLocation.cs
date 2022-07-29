using System;

namespace Shippingproject.Dto
{
    public class OrderDtoWithLocation
    {
        public int Id { get; set; }
        public string state{ get; set; }
        public string status{ get; set; }
        public string city{ get; set; }
        public string payment { get; set; }
        public string shipping { get; set; }
        public string delivery { get; set; }
        public string ClientName { get; set; }
        public string ClientPhone { get; set; }
        public string userId { get; set; }
        public decimal cost { get; set; }
        public DateTime Date { get; set; }
    }
}
