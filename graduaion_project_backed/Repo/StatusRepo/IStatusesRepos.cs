using Shippingproject.Dto;
using Shippingproject.Model;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IStatusesRepos
    {

        int Delete(int id);
        int Edit(int id, StatusDto status);
        Status FindById(int id);

        int Insert(StatusDto status);
        List<Status> GetAll();

        List<StatusPageCounterDTO> GetAllWithOrderCount();
        List<StatusPageCounterDTO> GetAllWithOrderCountForSeller(string id);
    }
}

