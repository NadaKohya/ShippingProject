using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shippingproject.Model
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal OrderCost { get; set; }
        public string ClientName { get; set; }
        public string ClientPhone { get; set; }
        [ForeignKey("State")]
        public int StateId { get; set; }
        public State State { get; set; }
        [ForeignKey("City")]
        public int CityId { get; set; }
        public City City { get; set; }
        [ForeignKey("Status")]
        public int StatusId { get; set; }
        public Status Status { get; set; }
        [ForeignKey("Payment")]
        public int PaymentId { get; set; }
        [ForeignKey("Deliveries")]
        public int DeliveryId { get; set; }
        [ForeignKey("TypeOfShipping")]
        public int ShipId { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public Payment Payments { get; set; }
        public virtual Delivery Deliveries { get; set; }
        public virtual TypeOfShipping TypeOfShipping { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

    }
}
