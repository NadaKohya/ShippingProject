using Shippingproject.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Model;
using System;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryRepo deliveryRepo;

        public DeliveryController(IDeliveryRepo  deliveryRepo)
        {
            this.deliveryRepo = deliveryRepo;
        }

        // GET: api/Delivery
        [HttpGet]
        public ActionResult GetDelivery()
        {


            return Ok(deliveryRepo.GetAll());
        }

        // GET: api/Delivery/5
        [HttpGet("{id:int}", Name = "GetOneDeliveryRoute")]
        public ActionResult GetDelivery(int id)
        {
            var Delivery = deliveryRepo.GetById(id);

            if (Delivery == null)
            {
                return NotFound();
            }

            return Ok(Delivery);
        }

        // PUT: api/Delivery/5

        [HttpPut("{id:int}")]
        public IActionResult PutDelivery(int id, Delivery Delivery)
        {

            if (ModelState.IsValid == true)
            {

                deliveryRepo.Update(id, Delivery);
                return StatusCode(204, "Data Updated");

            }

            else
            {
                return BadRequest("Data Dont Update");
            }


        }

        // POST: api/Delivery

        [HttpPost]
        public ActionResult PostDelivery(Delivery Delivery)
        {


            if (ModelState.IsValid == true)
            {
                deliveryRepo.Add(Delivery);
                string url = Url.Link("GetOneDeliveryRoute", new { id = Delivery.Id });
                return Created(url, Delivery);
            }

            return BadRequest(ModelState);


        }

        // DELETE: api/Delivery/5
        [HttpDelete("{id:int}")]
        public IActionResult DeleteDelivery(int id)
        {
            try
            {
                deliveryRepo.Delete(id);
                return StatusCode(204, "Data Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
