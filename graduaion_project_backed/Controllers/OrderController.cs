
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Shippingproject.Dto;
using Shippingproject.Model;
using Shippingproject.Repo;
using Shippingproject.Filter;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        readonly IOrderRepo OrderRepo;
        public OrderController(IOrderRepo OrderRepo)
        {
            this.OrderRepo = OrderRepo;
        }
        //[RequestFilter("Show", "Order")]
        [HttpGet]
        public IActionResult getAll()
        {
            var orders = OrderRepo.GetAllOrders();
            if (orders != null)
                return Ok(orders);
            else
                return Problem("No Data");
        }

        [HttpGet("{id:int}")]
        public IActionResult GetOrderById( int id)
        {
            var order = OrderRepo.GetById(id);
            if (order != null)
                return Ok(order);
            else
                return Problem("No Data");

        }
        [HttpGet("pagination/{pageNumber:int}")]
        public IActionResult getAll(int pageNumber)
        {
            try
            {
                return Ok(OrderRepo.GetAllwithPagination(pageNumber));
            }
            catch
            {
                return Problem("something went wrong");
            }

        }

        [HttpGet("seller/{id}")]
        public IActionResult GetOrderBySellerId(string id)
        {
            var orders = OrderRepo.GetOrdersByUserId(id);
            if (orders != null)
                return Ok(orders);
            else
                return Problem("No Data");

        }

        [HttpPost]
        //[RequestFilter("Add", "Order")]
        public IActionResult Create(Order order1)
        {
            if (ModelState.IsValid == true)
            {
                return Ok(OrderRepo.add(order1));            
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:int}")]
        [RequestFilter("Update", "Order")]
        public IActionResult UpdateOrder([FromRoute] int id, [FromBody] OrderDTO NewOrder)
        {
            if (ModelState.IsValid)
            {
                OrderRepo.Edit(id, NewOrder);
                return StatusCode(204, "the data Updated");
            }
            return BadRequest("Id Not Valid");

        }

        [HttpDelete("{id:int}")]
        [RequestFilter("Delete", "Order")]
        public IActionResult DeleteOnOrder(int id)
        {

            try
            {
                OrderRepo.Delete(id);
                return StatusCode(204, "Record Removed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("s/{statusId:int}")]
        public IActionResult GetByStatus(int statusId, int pageIndex)
        {

            var x =  Ok(OrderRepo.getByStatus(statusId,pageIndex));
            return Ok(x);
        }

        //[HttpGet("{statusId:int}")]
        //public IActionResult GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex)
        //{
        //    return Ok(OrderRepo.GetByDateAndStatus(start,end,statusId,pageIndex));
        //}





    }
}

