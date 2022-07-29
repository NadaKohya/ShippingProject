using Shippingproject.Dto;
using Shippingproject.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class BranchesRepo : IBranchRepo
    {
        private readonly ShippingDB db;

        public BranchesRepo(ShippingDB _db)
        {
            db = _db;
        }
        public int Add(Branches NewBranche)
        {
            db.Branches.Add(NewBranche);
            return db.SaveChanges();
        }
        public int Delete(int id)
        {
            Branches oldBranches = GetById(id);
            if (oldBranches != null)
            {
                db.Branches.Remove(oldBranches);
                return db.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
        public int Edit(int id, Branches NewBranche)
        {
            Branches oldBranches = GetById(id);
            if (oldBranches != null)
            {
                oldBranches.BranchName = NewBranche.BranchName;
                oldBranches.CityId = NewBranche.CityId;
                return db.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
        const int pageSize = 5;
        public int recordsCount()=> (db.Branches.Count()) / pageSize;
        public GlobalPageCounter<Branches> pagination(int pagenumber)
        {
            int count = recordsCount();
            var branches = db.Branches.Skip((pagenumber - 1) * pageSize).Take(pageSize).ToList();
            return new GlobalPageCounter<Branches>()
            {
                count = count,
                Record = branches
            };
        }

        public List<Branches> GetAll() => db.Branches.ToList();

        public Branches GetById(int id) => db.Branches.SingleOrDefault(B =>B.Id == id);

    }
}
