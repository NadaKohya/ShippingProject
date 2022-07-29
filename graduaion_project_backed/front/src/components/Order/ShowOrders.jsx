import React, { useEffect, useState, useCallback, useRef } from "react";
import { getAllOrder, deleteOrder, getByStatus, getAllOrderBySellerId } from "../../Services/Order";
import { getAll } from "../../Services/Status";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "../Order/SearchBar";
import { useNavigate } from "react-router-dom";

import { decoder, user } from '../../common/baseUrl'

export default function ShowOrderss() {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [State, setState] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const order = useRef([]);
  const [filteredOrder, setFilteredOrder] = useState([]);

  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };
  let [role, SetRole] = useState("");
  let userId;

  useEffect(() => {

    console.log(userId)
  }, [])

  if (user) {

    role = decoder(localStorage.getItem("userToken")).role
    userId = decoder(localStorage.getItem("userToken")).id

  }
  //////// search
  async function getOrders() {
    const orderData = await getAllOrder();
    console.log(orderData);
    setOrders(orderData.sort((a, b) => a.Orders.localeCompare(b.Orders)));
    setFilteredOrder(Orders.current);
  }

  useEffect(() => {
    (async function () {
      const { data: Orders } = await getAllOrder()
      const { data: status } = await getAll()

      if (!(role.includes('Admin')) && !(role.includes('Emp'))) {

        setFilteredOrder(Orders.filter(ele => {
          return ele.userId == userId
        }));
      } else {
        setFilteredOrder(Orders);
      }

    })()
  }, []);

  const onSearchSubmit = useCallback(
    async (term) => {
      if (term) {
        const o = Orders.filter((Orders) =>
          Orders.clientName.toLowerCase().includes(term)
        );
        setFilteredOrder(o);
      } else {
        setFilteredOrder(Orders);
      }
      console.log(Orders);
    },
    [Orders]
  );

  const whenclick = async () => {
    setShow(false);
    await deleteOrder(idToDelete);
    window.location.reload();
    const { data } = await getAllOrder();
    setOrders(data);
  };

  useEffect(() => {
    getAllOrder().then(({ data }) => {
      setOrders(data);
      setFilteredOrder(data);
    });

    getAll().then(({ data }) => {
      console.log(data);
      setState(data);

    });
  }, []);
  let SentId = (id) => {
    console.log(id);
    getByStatus(id, 1).then(({ data }) => {
      setOrders(data.value);
      setFilteredOrder(data.value);
    });
  };
  let SentAll = async () => {

    const { data: Orders } = await getAllOrder()

    if (!(role.includes('Admin')) && !(role.includes('Emp'))) {

      setFilteredOrder(Orders.filter(ele => {
        return ele.userId == userId
      }));
    } else {
      setFilteredOrder(Orders);
    }

  };
  return (
    <>
      <div class="container shadow-lg p-1 pt-3 mt-5" style={{ borderRadius: ".7em", border: "2px solid goldenrod" }}>
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class=" col-sm-3" >
                  <React.Fragment>
                    <SearchBar onSubmit={onSearchSubmit} />
                  </React.Fragment>
                </div>
              </div>
            </div>



            <table class="table table-hover table-bOrdersed">
                <div  style={{display:"flex" , justifyContent:"space-between"}}>
                  <div>
                    <button onClick={SentAll} class="shadow p-1"
                      style={{ fontSize: "12px", backgroundColor: "darkgreen", borderRadius: ".5em", border: "1px solid darkgreen", color: "white", fontWeight: "500" ,width: "Auto"}}>
                      All
                    </button>
                  </div>

                  {State.map(({ id, statusName }) => {
                    return (
                      <div >
                        <button
                           style={{ fontSize: "12px", backgroundColor: "darkgreen", borderRadius: ".5em", border: "1px solid darkgreen", color: "white", width: "Auto", fontWeight: "500" }}
                          className="btn-success"
                          onClick={() => SentId(id)}
                        >
                          {statusName}
                        </button>
                      </div>
                    );
                  })}
                </div>
            </table>
            <table class="shadow table table-striped table-hover table-bOrdersed" style={{ border: "1px solid goldenrod" }}>
              <thead>
                <tr >
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Id</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Name</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Phone</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Cost</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>City</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>State</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Status</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Payment</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Delivery</th>
                  <th style={{ fontSize: "1.3em", fontWeight: "500" }}>Shipping</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrder.map(
                  ({
                    id,
                    clientName,
                    clientPhone,
                    cost,
                    city,
                    state,
                    status,
                    payment,
                    delivery,
                    shipping,
                  }) => {
                    return (
                      <tr>
                        <td>{id}</td>
                        <td>{clientName}</td>
                        <td>{clientPhone}</td>
                        <td>{cost}</td>
                        <td>{city}</td>
                        <td>{state}</td>
                        <td>{status}</td>
                        <td>{payment}</td>
                        <td>{delivery}</td>
                        <td>{shipping}</td>

                        <td>
                          {role == "Admin" ?
                            <>
                              <Link
                                to={`/editOrder/${id}`}
                                href="#"
                                class="edit"
                                title="Edit"
                                data-toggle="tooltip"
                              >
                                <i class="material-icons">&#xE254;</i>
                              </Link>
                              <a
                                style={{ cursor: "pointer" }}
                                class="delete"
                                title="Delete"
                                data-toggle="tooltip"
                                onClick={() => setIdValAndShow(id)}
                              >
                                <i class="material-icons">&#xE872;</i>
                              </a>
                            </> : null}

                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <div className="clearfix">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#">
                    <i className="fa fa-angle-double-left"></i>
                  </a>
                </li>
                
                <li className="page-item mt-2">
                  <a href="#" className="page-link">
                    <i className="fa fa-angle-double-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>are u sure u want to delete this item ??!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={whenclick}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
