using Shippingproject.Model;
using Shippingproject.Dto;
namespace Shippingproject.Repo
{
    public interface IstateRepo : IGenericCrud<State>
    {
       
        GlobalPageCounter<State> GetAllPageination(int pageNumber);
      
        
    }
}
