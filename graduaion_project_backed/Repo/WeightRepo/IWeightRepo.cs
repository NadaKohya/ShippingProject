using Shippingproject.Model;

namespace Shippingproject.Repo
{
    public interface IWeightRepo
    {
        void EditSetting(WeightSetting setting);
        WeightSetting GetWeightSetting();
    }
}