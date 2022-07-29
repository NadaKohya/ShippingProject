using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Dto;
using System.Threading.Tasks;
using Shippingproject.Model;
using Shippingproject.Repo;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<MainRole> roleManager;
        private readonly IPremission_Role_Entityrepo pRCrepo;

        public RoleController(RoleManager<MainRole> roleManager, IPremission_Role_Entityrepo pRCrepo)
        {
            this.roleManager = roleManager;
            this.pRCrepo = pRCrepo;
        }
   

        [HttpPost]
        public async Task<IActionResult> Create( RoleDTO NewRole)
        {
            if (ModelState.IsValid == true)
            {
                MainRole role = new MainRole();
                role.Name = NewRole.RoleName;
                IdentityResult result = await roleManager.CreateAsync(role);
                if (result.Succeeded == true)
                {
                    return Ok();
                }
                else
                {
                    foreach (var item in result.Errors)
                    {
                        ModelState.AddModelError("", item.Description);
                    }
                }
            }
            return BadRequest();
        }


        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(pRCrepo.getAllRoles());
            }
            catch
            {
                return Problem("something went wrong");
            }
        }
    }
}
