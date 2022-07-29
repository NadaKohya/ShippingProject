using Shippingproject.Dto;
using Shippingproject.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Shippingproject.Repo
{
    public class StatusesRepos : IStatusesRepos
    {
        ShippingDB db;
        public StatusesRepos(ShippingDB db)
        {
            this.db = db;
        }
        public List<Status> GetAll()
        {
            return db.Statuses.ToList();
        }
        public Status FindById(int id)
        {
            return db.Statuses.FirstOrDefault(x => x.Id == id);
        }
        public int Delete(int id)
        {
            Status stu = FindById(id);
            db.Statuses.Remove(stu);
            return db.SaveChanges();
        }
        public int Insert(StatusDto status)
        {

            Status stu = new Status()
            {
                StatusName = status.Name,
            };
            try
            {
                db.Statuses.Add(stu);
                int raw = db.SaveChanges();
                return raw;
            }
            catch (Exception)
            {
                return -1;
            }

        }


        public int Edit(int id, StatusDto status)
        {
            Status oldStatus = FindById(id);
            if (oldStatus != null)
            {
                oldStatus.StatusName = status.Name;
                db.SaveChanges();
                return oldStatus.Id;
            }
            return 0;
        }

        public List<StatusPageCounterDTO> GetAllWithOrderCount()
        {
            List<Status> status = db.Statuses.Include(s=>s.Order).ToList();
            List<StatusPageCounterDTO> result = new List<StatusPageCounterDTO>();

            foreach (Status S1 in status)
            {
                result.Add(new StatusPageCounterDTO()
                {
                    OrderCount = S1.Order.Count,
                    StatusName = S1.StatusName
                });
            }
            return result;


         
        }

        public List<StatusPageCounterDTO> GetAllWithOrderCountForSeller(string id)
        {
            List<StatusPageCounterDTO> finalRes = new List<StatusPageCounterDTO>();
            finalRes =  db.Orders.Where(o=>o.UserId==id).Include(o => o.Status).GroupBy(o => o.Status.StatusName).Select(i => new StatusPageCounterDTO()
            {
                StatusName = i.Key,
                OrderCount = i.Count()
            }).ToList();

          

            return finalRes;
        }
    }
}

                  