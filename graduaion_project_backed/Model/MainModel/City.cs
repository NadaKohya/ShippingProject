using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Shippingproject.Model
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string CityName { get; set; }
        public decimal CostPerCity { get; set; }
        [ForeignKey("state")]
        public int stateId { get; set; }
        [JsonIgnore]
        public virtual List<Branches> Branches { get; set; } = new List<Branches>();
        [JsonIgnore]
        public virtual List<Order> Order { get; set; } = new List<Order>();
        public State state { set; get; }
    }
}
