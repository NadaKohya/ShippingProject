import React, { useState, useEffect } from "react";
import { getAll as getAllStatus, getById } from "../../Services/Status";

import { getAllOrder, getByStatusAndDate } from "../../Services/Order";

export default function ShowOrderss() {
  const [Order, setOrder] = useState([]);
  const [Status, setStatus] = useState([]);
  const [StatusDate, setStatusDate] = useState({
    Statusid: "",
    StartDate: "",
    EndDate: "",
    PageId: 1,
  });
  const handleInput = (e) => {
    setStatusDate({
      ...StatusDate,
      [e.target.name]:
        e.target.type == "Date" || e.target.type == "select-one"
          ? +e.target.value
          : e.target.value,
    });

    console.log(e.target);
  };

  useEffect(() => {
    getAllStatus()
      .then((Data) => {
        setStatus(Data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  let sendDateAndStatus = () => {
    getByStatusAndDate(StatusDate)
      .then((Data) => {
        console.log(Data.data);

        setOrder(Data.data);
      })

      .catch((error) => {
        console.log(error);
      });
    console.log(Order);
  };

  return (
    <>
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <select
              value={Status.statusId}
              name="Statusid"
              onChange={handleInput}
              class="form-select mt-3"
              aria-label="Default select example"
            >
              <option selected>Select Status</option>
              {Status.map((status) => {
                return <option value={status.id}>{status.name}</option>;
              })}
            </select>

            <lable>Date From</lable>
            <input type="date" onChange={handleInput} name="StartDate" />
            <lable>Date To</lable>
            <input type="date" onChange={handleInput} name="EndDate" />
            <input type="button" value="Search" onClick={sendDateAndStatus} />

            <table class="table table-striped table-hover table-bOrdersed">
              <thead>
                <tr>
                  <th>
                    id <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Date <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Coset <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    Customer Name <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    CustomerPhone <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    City Name <i class="fa fa-sort"></i>
                  </th>
                  <th>
                    stateName <i class="fa fa-sort"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Order.map(
                  ({
                    id,
                    date,
                    cost,
                    customerName,
                    customerPhone,
                    cityName,
                    stateName,
                  }) => {
                    return (
                      <tr>
                        <td>{id}</td>
                        <td>{date}</td>
                        <td>{cost}</td>
                        <td>{customerName}</td>
                        <td>{customerPhone}</td>
                        <td>{cityName}</td>
                        <td>{stateName}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <div class="clearfix">
              <div class="hint-text">
                Showing <b>5</b> out of <b>25</b> entries
              </div>
              <ul class="pagination">
                <li class="page-item disabled">
                  <a href="#">
                    <i class="fa fa-angle-double-left"></i>
                  </a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">
                    2
                  </a>
                </li>
                <li class="page-item active">
                  <a href="#" class="page-link">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">
                    4
                  </a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">
                    5
                  </a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">
                    <i class="fa fa-angle-double-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
