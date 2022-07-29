using Shippingproject.Dto;
using Shippingproject.Model;

namespace Shippingproject.Repo
{
    public interface IBranchRepo:IGenericCrud<Branches>
    {
        int recordsCount();
        GlobalPageCounter<Branches> pagination(int PageNumber);
    }
}
