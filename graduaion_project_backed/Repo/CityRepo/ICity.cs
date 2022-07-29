using Shippingproject.Model;
using System.Collections.Generic;
using Shippingproject.Dto;
namespace Shippingproject.Repo
{
    public interface ICity:IGenericCrud<City>
    {
        City FindByNme(string name);
        bool newNameExist(int cityId,string newName);

        CitiesPageCounterDTO GetAllwithPagination(int pageNumber);

        int recordsCount();
    }
}
