using Shippingproject.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Model;
using System;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepo paymentRepo;

        public PaymentController(IPaymentRepo  paymentRepo)
        {
            this.paymentRepo = paymentRepo;
        }

        // GET: api/Payment
        [HttpGet]
        public ActionResult GetPayment()
        {


            return Ok(paymentRepo.GetAll());
        }

        // GET: api/Payments/5
        [HttpGet("{id:int}", Name = "GetOnePaymentRoute")]
        public ActionResult GetPayment(int id)
        {
            var Payment = paymentRepo.GetById(id);

            if (Payment == null)
            {
                return NotFound();
            }

            return Ok(Payment);
        }

        // PUT: api/Payment/5

        [HttpPut("{id:int}")]
        public IActionResult PutPayment(int id, Payment Payment)
        {

            if (ModelState.IsValid == true)
            {

                paymentRepo.Update(id, Payment);
                return StatusCode(204, "Data Updated");

            }

            else
            {
                return BadRequest("Data Dont Update");
            }


        }

        // POST: api/Payments

        [HttpPost]
        public ActionResult PostPayment(Payment Payment)
        {


            if (ModelState.IsValid == true)
            {
                paymentRepo.Add(Payment);
                string url = Url.Link("GetOnePaymentRoute", new { id = Payment.Id });
                return Created(url, Payment);
            }

            return BadRequest(ModelState);


        }

        // DELETE: api/Payments/5
        [HttpDelete("{id:int}")]
        public IActionResult DeletePayment(int id)
        {
            try
            {
                paymentRepo.Delete(id);
                return StatusCode(204, "Data Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
