using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Repo;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermission permission;

        public PermissionController(IPermission permission)
        {
            this.permission = permission;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(permission.getAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }
    }
}
