using Shippingproject.Model;
using System.Linq;
namespace Shippingproject.Repo
{
    public class WeightRepo : IWeightRepo
    {
        private readonly ShippingDB db;

        public WeightRepo(ShippingDB db)
        {
            this.db = db;
        }
        public void EditSetting(WeightSetting setting)
        {
            var Wsetting = db.WeightSettings.FirstOrDefault(w => w.id == 1);
            Wsetting.CostIncrease = setting.CostIncrease;
            Wsetting.StaticCost = setting.StaticCost;
            Wsetting.StaticWeight = setting.StaticWeight;
            db.SaveChanges();
        }

        public WeightSetting GetWeightSetting()
        {
            return db.WeightSettings.Take(1).SingleOrDefault();
        }
    }
}
