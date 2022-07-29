import React, { useEffect, useState } from "react";
import { getAll, deleteStatus } from "../../Services/Status";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { decoder } from '../../common/baseUrl'
export default function ShowStatuses() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [show, setShow] = useState(false);
  const [DeleteId, setDeletedId] = useState(null);

  const setIdValAndShow = (id) => {
    setDeletedId(id);
    setShow(true);
  };
  const whenclick = async () => {
    setShow(false);
    try {
      await deleteStatus(DeleteId);
      const { data } = await getAll();
      setStatuses(data);
      navigate("/Statuses");
    } catch ({ response: { data, status } }) {
      if (status == 401) {
        navigate("/notAuthorized");
      }
    }

  };

  useEffect(() => {
    console.log("called ");
    getAll().then(({ data }) => {
      setStatuses(data);
    });
  }, []);
  let [role, SetRole] = useState("");

  useEffect(() => {
      SetRole(decoder(localStorage.getItem("userToken")).role)
      console.log(role)
  }, [])

  return (
    <>
      <div class="container">
      {role.includes('Admin')||role.includes('Emp') ?
      <>
        <div className="container p-4 pt-5 shadow-lg mt-5" style={{backgroundColor:"rgba(255, 255, 255, 0.807)", borderRadius:"1em"}}>
                            <div class="row">
                                <div class="col-12"><h1>Statuses </h1></div>
                                <div className="col-sm-8" style={{ marginTop: "-2em" }}>
                      <Link to={`/addStatus`} href="#" className=" fab">
                        +
                      </Link>
                    </div>
                <div className="shadow p-3" style={{ borderRadius: ".7em", marginBottom:"1.5em" }}>
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  Status Id <i class="fa fa-sort"></i>
                </th>
                <th>
                  Name <i class="fa fa-sort"></i>
                </th>
                <th>
                  Delete<i class="fa fa-sort"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {statuses.map(({ id, statusName }) => {
                return (
                  <tr>
                    <td>{id}</td>
                    <td>{statusName}</td>
                    <td>
                      <Link to={`/EditStatus/${id}`} href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></Link>
                      <a
                        style={{ cursor: "pointer" }}
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => setIdValAndShow(id)}
                      >
                        <i class="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        </div>
        </> : null}
      </div>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this item ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={whenclick}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
