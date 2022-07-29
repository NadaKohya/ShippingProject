using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Repo;
namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityController : ControllerBase
    {
        private readonly IEntityRepo controllerRepo;

        public EntityController( IEntityRepo controllerRepo )
        {
            this.controllerRepo = controllerRepo;
        }


        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(controllerRepo.getAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }
    }
}
