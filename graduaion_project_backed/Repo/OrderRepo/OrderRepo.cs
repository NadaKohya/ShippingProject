using Shippingproject.Dto;
using Shippingproject.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using ShippingProject.Dto;

namespace Shippingproject.Repo
{
    public class OrderRepo : IOrderRepo
    {
        private readonly ShippingDB db;
        int pageSize = 6;

        public OrderRepo(ShippingDB db)
        {
            this.db = db;
        }


        public List<OrderDtoWithLocation> GetAllOrders()
        {
            List<Order> orderList = db.Orders
                .Include(o=>o.City)
                .Include(o=>o.Status)
                .Include(o=>o.State)
                .Include(o=>o.Payments)
                .Include(o=>o.TypeOfShipping)
                .Include(o=>o.Deliveries)
                .ToList();
            List<OrderDtoWithLocation> orders = new List<OrderDtoWithLocation>();

            foreach (var res in orderList)
            {
                var Dto = new OrderDtoWithLocation()
                {
                    Id = res.Id,
                    city = res.City.CityName,
                    state = res.State.StateName,
                    status = res.Status.StatusName,
                    payment = res.Payments.PaymentType,
                    shipping = res.TypeOfShipping.ShipName,
                    delivery = res.Deliveries.DeliveryName,
                    ClientName = res.ClientName,
                    ClientPhone = res.ClientPhone,
                    cost = (int)res.OrderCost,
                    Date = res.Date,
                    userId = res.UserId
                };
                orders.Add(Dto);
            }
            
      
             return orders;
        }

        public int add(Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            return order.Id;
        }
        public OrderDTO GetById(int id)
        {
            var res = db.Orders.FirstOrDefault(o => o.Id == id);
            return new OrderDTO()
            {
                cityId = res.CityId,
                stateId = res.StateId,
                statusId = res.StatusId,
                ClientPhone = res.ClientPhone,
                ClientName = res.ClientName,
                paymentId = res.PaymentId,
                shippingId = res.ShipId,
                deliveryId = res.DeliveryId,
                cost = (int)res.OrderCost,
                Date = res.Date,
                userId = res.UserId
            };
        }

        public int Edit(int id, OrderDTO order)
        {
            Order old = GetByIdOrder(id);
            if (old != null)
            {
                old.Date = order.Date;
                old.OrderCost = order.cost;
                old.ClientName = order.ClientName;
                old.ClientPhone = order.ClientPhone;
                old.StateId = order.stateId;
                old.CityId = order.cityId;
                old.StatusId = order.statusId;
                old.DeliveryId = order.deliveryId;
                old.PaymentId = order.paymentId;
                old.ShipId = order.shippingId;
                return db.SaveChanges();
            }
            return -1;
        }

       

        public List<OrderDtoWithLocation> getByStatus(int statusId, int pageIndex)
        {
            return db.Orders.Where(o => o.StatusId == statusId).Select(o => new OrderDtoWithLocation() { Id=o.Id, city=o.City.CityName, ClientName= o.ClientName, ClientPhone=o.ClientPhone, cost= o.OrderCost , delivery = o.Deliveries.DeliveryName , payment=o.Payments.PaymentType, shipping=o.TypeOfShipping.ShipName , state = o.State.StateName, status = o.Status.StatusName}).Skip(pageSize * (pageIndex-1)).Take(pageSize).ToList();
              
        }

        public int Delete(int id)
        {
            Order order1 = db.Orders.FirstOrDefault(p => p.Id == id);
            if (order1 != null)
            {
                db.Orders.Remove(order1);
                int rowRemoved = db.SaveChanges();
                return rowRemoved;
            }
            return 0;
        }

        public List<Order> GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex)
        {
            return db.Orders.
                   Where(o => o.StatusId == statusId && (o.Date < end && o.Date > start)).Skip(pageSize * (pageIndex - 1)).Take(pageSize).
                   ToList();
                  
        }

        public Order GetByIdOrder(int id)
        {
            return db.Orders.FirstOrDefault(o => o.Id == id);
        }
        public OrdersPageCounterDTO GetAllwithPagination(int pageNumber)
        {
            int count = recordsCount();
            var Orders = db.Orders.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new OrdersPageCounterDTO()
            {
                count = count,
                orders = Orders
            };
        }
        public int recordsCount()
        {
            return (db.Cities.Count()) / pageSize;
        }

        public List<OrderDtoWithLocation> GetOrdersByUserId(string userId)
        {
            List<Order> orderList = db.Orders.Where(o=>o.UserId==userId)
                .Include(o => o.City)
                .Include(o => o.Status)
                .Include(o => o.State)
                .ToList();
            List<OrderDtoWithLocation> orders = new List<OrderDtoWithLocation>();

            foreach (var res in orderList)
            {
                var Dto = new OrderDtoWithLocation()
                {
                    Id = res.Id,
                    city = res.City.CityName,
                    state = res.State.StateName,
                    status = res.Status.StatusName,
                    ClientPhone = res.ClientPhone,
                    ClientName = res.ClientName,
                    cost = (int)res.OrderCost,
                    Date = res.Date,
                    userId = res.UserId
                };
                orders.Add(Dto);
            }
            return orders;
        }
    }
}
