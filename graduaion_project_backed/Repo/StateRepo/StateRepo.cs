using Shippingproject.Model;
using Shippingproject.Dto;
using System.Collections.Generic;
using System.Linq;
namespace Shippingproject.Repo
{
    public class StateRepo :IstateRepo
    {
        readonly ShippingDB db; 
        public StateRepo(ShippingDB db)
        {
            this.db = db;   
        }
        public int Add(State New)
        {         
            db.States.Add(New);
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
          var state = db.States.SingleOrDefault(s=>s.Id == id);
            if( state != null)
            {
                db.States.Remove(state);
                return db.SaveChanges();
            }
            return -1; 
        }

        public int Edit(int id, State New)
        {
            var Oldstate = db.States.SingleOrDefault(s => s.Id == id);
            if (Oldstate != null)
            {
                Oldstate.StateName = New.StateName;
                return db.SaveChanges();
            }
            return -1;
        }

        public List<State> GetAll()
        {
            return db.States.ToList();
        }

        public GlobalPageCounter<State> GetAllPageination(int pageNumber)
        {
            return new GlobalPageCounter<State>()
            {
                count = db.States.Count(),
                Record = db.States.Skip(2 * (pageNumber - 1)).Take(4).ToList()
            };
               
        }

        public State GetById(int id)
        {
            return db.States.SingleOrDefault(s => s.Id == id);
        }
    }
}
