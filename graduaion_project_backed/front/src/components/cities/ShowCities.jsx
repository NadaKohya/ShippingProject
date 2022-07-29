import React, { useEffect, useState } from "react";
import { deleteCity, getAllWithPagination } from "../../Services/City";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { decoder } from '../../common/baseUrl'
import { useNavigate } from "react-router-dom";

import "./ShowCities.css";
import { FaSearch } from "react-icons/fa";

export default function ShowCities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [citiesCount, setcitiesCount] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [currentPge, setCurrentPge] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };

  let [role, SetRole] = useState("");


  useEffect(() => {
    SetRole(decoder(localStorage.getItem("userToken")).role)
    console.log(role)
  }, [])

  const whenclick = async () => {
    setShow(false)
    try {
      await deleteCity(idToDelete);
      const { data: { cities } } = await getAllWithPagination(currentPge)
      setCities(cities)
    } catch ({ response: { data, status } }) {
      if (status == 401) {
        navigate("/notAuthorized")
      }
    }
  }

  const renderPagesNumbers = () => {
    let out = [];
    for (let i = 1; i <= citiesCount; i++) {
      out.push(
        <li onClick={() => handlePagination(i)} className="page-item">
          <a href="#" className="page-link">
            {i}
          </a>
        </li> 
      );
    }
    return out;
  };

  const handlePagination = async (pageNumber) => {
    setCurrentPge(pageNumber);
    const {
      data: { cities },
    } = await getAllWithPagination(pageNumber);
    setCities(cities);
  };

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { cities, count },
        } = await getAllWithPagination(1);
        setCities(cities);
        setcitiesCount(count);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div>
        {role.includes('Admin')||role.includes('Emp') ?
          <>
            <div className="container p-4 pb-1 pt-5 shadow-lg  mt-5" style={{backgroundColor:"rgba(255, 255, 255, 0.707)", borderRadius:"1em"}}>
              <h1>Cities</h1>
              <div className="table-responsive" style={{ borderRadius:"1em"}}>
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="col-sm-8" style={{ marginTop: "-2em" }}>
                      <Link to={`/addCity`} href="#" className=" fab">
                        +
                      </Link>
                    </div>
                    <div className="shadow p-3" style={{ borderRadius: ".7em" }}>
                      <div class="row">
                        <div class=" col-sm-3 mb-4" style={{ margin: "2em 0 3em 1em", fontSize: "1em" }}>
                          <Form className="d-flex">
                            <Form.Control
                              type="search"
                              placeholder="Search"
                              className="col-2 shadow me-2"
                              aria-label="Search"
                              style={{ borderRadius: ".75em" }}
                            />
                            <div
                              style={{
                                lineHeight: "3",
                                color: "rgba(0, 100, 0, 0.836)",
                                border: "none",
                                fontSize: "1.1em",
                              }}
                            >
                              <FaSearch></FaSearch>
                            </div>
                          </Form>
                        </div>
                      </div>
                      <table
                        className="shadow table table-striped table-hover table-bordered"
                        style={{ borderRadius: "0.5em" }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                fontSize: "1.6em",
                                fontWeight: "500",
                                textAlign: "center",
                              }}
                            >
                              City
                            </th>
                            <th
                              style={{
                                fontSize: "1.6em",
                                fontWeight: "500",
                                textAlign: "center",
                              }}
                            >
                              Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cities.map(({ id, cityName, costPerCity }) => {
                            return (
                              <tr>
                                <td style={{textAlign:"center"}}>{cityName}</td>
                                <td style={{textAlign:"center"}}>{costPerCity}</td>
                                <td style={{textAlign:"center"}}>
                                  <Link
                                    to={`/editCity/${id}`}
                                    href="#"
                                    className="edit"
                                    title="Edit"
                                    data-toggle="tooltip"
                                  >
                                    <i className="material-icons">&#xE254;</i>
                                  </Link>
                                  <a
                                    style={{ cursor: "pointer" }}
                                    className="delete"
                                    title="Delete"
                                    data-toggle="tooltip"
                                    onClick={() => setIdValAndShow(id)}
                                  >
                                    <i className="material-icons">&#xE872;</i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="clearfix">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a href="#">
                          <i className="fa fa-angle-double-left"></i>
                        </a>
                      </li>
                      {renderPagesNumbers()}
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
          </> : null}



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
      </div>
    </>
  );
}
