using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Model;
using Shippingproject.Repo;
using Shippingproject.Filter;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {

        IstateRepo stateRepo;
        public StateController(IstateRepo stateRepo)
        {
            this.stateRepo = stateRepo;
        }
        [HttpGet]
        public IActionResult getStatesByPageNumber(int pageNumber)
        {
            var states = stateRepo.GetAllPageination(pageNumber);
            if(states != null)
                return Ok(states);
            return Problem(detail: "no data");
        }
        [HttpGet("All/")]
        //[RequestFilter("Show", "States")]

        public IActionResult getAllStates()
        {
            var states = stateRepo.GetAll();
            if (states != null)
                return Ok(states);
            return Ok(0);
        }

        [HttpGet("{id:int}", Name = "getState")]
      // [RequestFilter("Show", "States")]

        public IActionResult getStatesById(int id)
        {
            var state = stateRepo.GetById(id);
            if (state != null)
                return Ok(state);
            return Problem(detail: "no data");
        }
        [HttpPost]
        [RequestFilter("Add", "State")]

        public IActionResult PostState(State state)
        {
            if (ModelState.IsValid == true)
            {
                int res = stateRepo.Add(state);
                string url = Url.Link("getState", new { id = state.Id });
                return Created(url, state);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:int}")]
        [RequestFilter("Update", "State")]

        public IActionResult UpdateState(int id, State s)
        {

            var rowsEffected=stateRepo.Edit(id,s);

                return Ok();
          
                //return Problem(detail: "no data");
        }

        [HttpDelete("{id:int}")]
        [RequestFilter("Delete", "State")]
        public IActionResult DeleteState(int id)
        {

            var rowsEffected = stateRepo.Delete(id);
                return Ok();

        }
    }
}
