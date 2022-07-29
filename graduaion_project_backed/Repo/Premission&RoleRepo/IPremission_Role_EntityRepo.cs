using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IPremission_Role_Entityrepo
    {
        int Add(Premission_Role_Entity New);
        string GetRoleIdByName(string Name);
        List<MainRole> getAllRoles();
    }
}