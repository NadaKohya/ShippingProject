using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IGenericCrud<Table>
    {
        int Add(Table New);
        int Delete(int id);
        int Edit(int id, Table New);
        List<Table> GetAll();
        Table GetById(int id);
    }
}
