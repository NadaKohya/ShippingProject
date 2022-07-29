using System.Collections.Generic;

namespace Shippingproject.Dto
{
    public class GlobalPageCounter<Table>
    {
        public List<Table> Record { get; set; }
        public int count { get; set; }
    }
}
