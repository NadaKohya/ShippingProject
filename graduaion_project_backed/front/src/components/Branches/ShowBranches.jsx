import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteBranch, getAll } from "../../Services/branch";
import { paginationaBaranches } from "./../../Services/branch";
import { decoder } from '../../common/baseUrl'
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './ShowBranches.css'

export default function ShowBranches() {
  const [branches, setBranches] = useState([]);
  const [branchesCount, setBranchesCount] = useState([]);
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  useEffect(() => {
    paginationaBaranches(1).then(({ data }) => {
      setBranches(data.record);

    });
  }, []);
  let [role, SetRole] = useState("");

  useEffect(() => {
      SetRole(decoder(localStorage.getItem("userToken")).role)
      console.log(role)
  }, [])
  const setIdValAndShow = (id) => {
    setIdToDelete(id);
    setShow(true);
  };
  const whenclick = async () => {
    setShow(false);
    try {
      await deleteBranch(idToDelete);
      const {
        data: { record },
      } = await paginationaBaranches(currentPage);
      setBranches(record);

    } catch ({ response: { data, status } }) {
      if (status == 401) {
        navigate("/notAuthorized")
      }
    }
  };
  const pagesNumbers = () => {
    let out = [];
    for (let i = 1; i <= branchesCount; i++) {
      out.push(
        <li onClick={() => pagination(i)} className="page-item">
          <a href="#" className="page-link">
            {i}
          </a>
        </li>
      );
    }
    return out;
  };
  const pagination = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const {
      data: { record },
    } = await paginationaBaranches(pageNumber);
    setBranches(record);
  };
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { record, count },
        } = await paginationaBaranches(1);
        setBranches(record);
        setBranchesCount(count);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <div class="container">
        {role.includes('Admin')||role.includes('Emp') ?
          <>
            <div className="container p-4 pt-5 shadow-lg  mt-5" style={{borderRadius:".7em"}}>
              <h1>Branches</h1>
              <div className="table-responsive">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="col-sm-8" style={{ marginTop: "-2em" }}>
                      <Link to={`/addBranch`} href="#" className=" fab">
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
                <table className="shadow table table-striped table-hover table-bordered"
                        style={{ borderRadius: "0.5em" }}>
                  <thead>
                    <tr>
                      <th  style={{
                                fontSize: "1.6em",
                                fontWeight: "500",
                                textAlign: "center",
                              }}>
                        Branch
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map(({ id, branchName, cityId }) => {
                      return (
                        <tr>
                          <td className="text-center">{branchName}</td>
                          <td>
                            <Link
                              to={`/editBranch/${id}`}
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
                  {/* <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div> */}
                  <ul className="pagination">
                    <li className="page-item disabled" style={{marginTop:"-.55em"}}>
                      <a href="#">
                        <i className="fa fa-angle-double-left"></i>
                      </a>
                    </li>
                    {pagesNumbers()}
                    <li className="page-item">
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
