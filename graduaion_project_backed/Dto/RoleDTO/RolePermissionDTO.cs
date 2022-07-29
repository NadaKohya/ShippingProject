using System.Collections.Generic;

namespace Shippingproject.Dto
{
    public class RolePermissionDTO
    {
        public Dictionary<int,List<int>> PermissionMat { get; set; } = new Dictionary<int,List<int>>();
        public string RoleName { get; set; }
    }
}
