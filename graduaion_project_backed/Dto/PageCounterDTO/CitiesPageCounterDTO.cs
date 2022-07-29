using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Dto
{
    public class CitiesPageCounterDTO
    {
        public List<City> cities { get; set; }
        public int count { get; set; }
    }
}
