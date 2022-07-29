using Shippingproject.Model;
using System.Collections.Generic;
using System.Linq;
using Shippingproject.Dto;
namespace Shippingproject.Repo
{
    public class CityRepo : ICity
    {
        int pageSize = 6;
        private readonly ShippingDB db;

        public CityRepo( ShippingDB db )
        {
            this.db = db;
        }
        public int Add(City New)
        {
            db.Cities.Add( New );
            db.SaveChanges();
            return New.Id;
        }

        public int Delete(int id)
        {
            City city = GetById(id);
            db.Cities.Remove(city);
            return db.SaveChanges();
        }

        public int Edit(int id, City New)
        {
            City oldCity = GetById(id);
            if (oldCity != null)
            {
                oldCity.CityName = New.CityName;
                oldCity.CostPerCity = New.CostPerCity;
                oldCity.stateId= New.stateId;
                db.SaveChanges();
                return oldCity.Id;
            }
            return 0;
        }

        public List<City> GetAll()
        {
           return db.Cities.ToList();
        }

        public CitiesPageCounterDTO GetAllwithPagination(int pageNumber)
        {
            int count= recordsCount();
            var cities = db.Cities.Skip((pageNumber-1)*pageSize).Take(pageSize).ToList();
            return new CitiesPageCounterDTO()
            {
                count= count,
                cities= cities
            };
        }
        public int recordsCount()
        {
            return (db.Cities.Count())/pageSize;
        }
        public City GetById(int id)
        {
            return db.Cities.Where(c => c.Id == id).SingleOrDefault();
        }
        public bool newNameExist(int cityId, string newName)
        {
            return db.Cities.Any(city=> city.CityName==newName && city.Id !=cityId);
        }

        public City FindByNme(string name)
        {
           return db.Cities.FirstOrDefault(c => c.CityName==name);
        }
    }
}
