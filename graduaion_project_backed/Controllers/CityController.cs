using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shippingproject.Repo;
using Shippingproject.Model;
using Shippingproject.Filter;

namespace Shippingproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICity cityRepo;
        public CityController( ICity cityRepo )
        {
            this.cityRepo = cityRepo;
        }


        [HttpGet("pagination/{pageNumber:int}")]
        public IActionResult getAll(int pageNumber)
        {
            try
            {
                return Ok(cityRepo.GetAllwithPagination(pageNumber));
            }
            catch
            {
                return Problem("something went wrong");
            }

        }

        [HttpGet]
        //[RequestFilter("Show", "City")]
        public IActionResult getAll()
        {
            try
            {
                return Ok(cityRepo.GetAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }

        [HttpGet("{id:int}")]
        //[RequestFilter("Show", "City")]
        public IActionResult getcity(int id)
        {
            try
            {
                City city = cityRepo.GetById(id);
                if (city == null)
                {
                    return Problem("the id doesn't exist");
                }
                return Ok(city);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

        [HttpPost]
        [RequestFilter("Add", "City")]
        public IActionResult addcity(City city)
        {
            try
            {
                var checkCity = cityRepo.FindByNme(city.CityName);
                
                if (checkCity != null) return Problem("the city name is already exist");
                
                var addCity= cityRepo.Add(city);
                return Ok(addCity);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }
        [RequestFilter("Update", "City")]
        [HttpPut("{id:int}")]
        public IActionResult editcity(int id, City city)
        {

            try
            {
                var cityNmeExists = cityRepo.newNameExist(id,city.CityName);

                if (cityNmeExists) return Problem("the city name is already exist");
            
                var editCity = cityRepo.Edit(id, city);
                return Ok(editCity);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }


        [HttpDelete("{id:int}")]
        [RequestFilter("Delete", "City")]
        public IActionResult deletecity(int id)
        {
            try
            {
                if (cityRepo.GetById(id) == null)
                {
                    return Problem("the id doesn't exist");
                }
                return Ok(cityRepo.Delete(id));
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

    }
}
