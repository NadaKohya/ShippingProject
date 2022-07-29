using Shippingproject.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Model;
using System;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingController : ControllerBase
    {
        private readonly IShippingRepo shippingRepo;

        public ShippingController(IShippingRepo shippingRepo)
        {
            this.shippingRepo = shippingRepo;
        }

        // GET: api/Shipping
        [HttpGet]
        public ActionResult GetShipping()
        {


            return Ok(shippingRepo.GetAll());
        }

        // GET: api/Shippings/5
        [HttpGet("{id:int}", Name = "GetOneShippingRoute")]
        public ActionResult GetShipping(int id)
        {
            var Shipping = shippingRepo.GetById(id);

            if (Shipping == null)
            {
                return NotFound();
            }

            return Ok(Shipping);
        }

        // PUT: api/Shipping/5

        [HttpPut("{id:int}")]
        public IActionResult PutShipping(int id, TypeOfShipping Shipping)
        {

            if (ModelState.IsValid == true)
            {

                shippingRepo.Update(id, Shipping);
                return StatusCode(204, "Data Updated");

            }

            else
            {
                return BadRequest("Data Dont Update");
            }


        }

        // POST: api/Shippings

        [HttpPost]
        public ActionResult PostShipping(TypeOfShipping Shipping)
        {


            if (ModelState.IsValid == true)
            {
                shippingRepo.Add(Shipping);
                string url = Url.Link("GetOneShippingRoute", new { id = Shipping.Id });
                return Created(url, Shipping);
            }

            return BadRequest(ModelState);


        }

        // DELETE: api/Shippings/5
        [HttpDelete("{id:int}")]
        public IActionResult DeleteShipping(int id)
        {
            try
            {
                shippingRepo.Delete(id);
                return StatusCode(204, "Data Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
