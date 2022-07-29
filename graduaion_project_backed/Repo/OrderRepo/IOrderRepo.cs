using Shippingproject.Dto;
using Shippingproject.Model;
using ShippingProject.Dto;
using System;
using System.Collections.Generic;

namespace Shippingproject.Repo
{
    public interface IOrderRepo
    {
        int add(Order order);
        List<OrderDtoWithLocation> GetAllOrders();
        List<OrderDtoWithLocation> GetOrdersByUserId(string userId);
        int Delete(int id);
        int Edit(int id, OrderDTO order);
        OrdersPageCounterDTO GetAllwithPagination(int pageNumber);

        int recordsCount();
        List<Order> GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex);
        OrderDTO GetById(int id);
        Order GetByIdOrder(int id);
        List<OrderDtoWithLocation> getByStatus(int statusId, int pageIndex);
    }
}