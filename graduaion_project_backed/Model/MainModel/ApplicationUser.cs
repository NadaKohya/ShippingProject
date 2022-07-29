using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shippingproject.Model
{
    public class ApplicationUser:IdentityUser
    {
        
        public virtual List<Order> Order { get; set; }
        = new List<Order>();

    }
}
