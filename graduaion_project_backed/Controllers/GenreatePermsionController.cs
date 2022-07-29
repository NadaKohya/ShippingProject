using Shippingproject.Repo;
using Shippingproject.Model;
using Shippingproject.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreatePermsionController : ControllerBase
    {
        readonly IPremission_Role_Entityrepo perRepo;
        readonly RoleManager<MainRole> roleManager;
        public GenreatePermsionController(IPremission_Role_Entityrepo perRepo, RoleManager<MainRole> roleManager)
        {
            this.perRepo = perRepo;
            this.roleManager = roleManager;
        }
        [HttpPost]
       public IActionResult CreatePermission (RolePermissionDTO Permission )
        {


            //create role 
            var res = CreateRole(Permission.RoleName);
            if( res.Result < 0)
                return BadRequest(res);

            var roleId = perRepo.GetRoleIdByName(Permission.RoleName);
            if( roleId == null)
                return BadRequest(res);


            foreach (var record in Permission.PermissionMat)
            {
                foreach (var permissionId in record.Value)
                {
                    perRepo.Add(new Model.Premission_Role_Entity()
                    {
                        EntityId = record.Key,
                        MainRoleId = roleId,
                        PremissionId = permissionId
                    }); 
                }
            }

            return Ok();
        }

        async Task<int> CreateRole(string RoleName)
        {
            MainRole role = new MainRole();
            role.Name = RoleName;
            IdentityResult result = await roleManager.CreateAsync(role);
            if (result.Succeeded == true)
            {
                return 1;
            }
            else
            {
                return -1;
            }
        }
    }
}
