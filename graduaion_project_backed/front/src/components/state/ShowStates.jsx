import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { GetAll, GetNumberOfPages, Delete } from '../../Services/State'
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form} from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { decoder } from '../../common/baseUrl'
export default function ShowStates(params) {

    const [states, setStates] = useState([]);
    const [NumberOfPages, setNumberOfPages] = useState(0);
    const [PageIndex, setPageIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [deletee, setDelete] = useState(false);
    const handleClose = () => setShow(false);
    

    const navigate = useNavigate();
    const HelperARR = []
    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    useEffect(() => {
        GetAll(PageIndex + 1).then(
            ({ data }) => {
                setStates(data.record)
                setNumberOfPages(data.count)

            },
            (err) => { alert("errore while get state") }
        )
    }, [PageIndex])

    function HandelNew() {
        navigate("/addState")
    }
    function HandelPageination(par) {
        setPageIndex(par - 1);
    }
     async function HandelDelete(id) {

        alert("you are about to delete ");
       //  setShow(true);
      //   console.log(show);
    //    if(deletee)
    try {
        await  Delete(id);
    } catch ({ response: { data, status } }) {
        if (status == 401) {
            navigate("/notAuthorized")
        }
    }
        // navigate("/states")
        window.location.reload()
     //   else
      //  setShow(false) 
   
    }
    return (
        <>
            <div class="container">
            {role.includes('Admin')||role.includes('Emp') ?
                <>
            <div className="container p-4 pt-5 shadow-lg mt-5" style={{backgroundColor:"rgba(255, 255, 255, 0.807)", borderRadius:"1em"}}>
                            <div class="row">
                                <div class="col-12"><h1>Governorates <b></b></h1></div>
                                <div className="col-sm-8" style={{ marginTop: "-2em" }}>
                      <Link to={`/addState`} href="#" className=" fab">
                        +
                      </Link>
                    </div>
                                <div className="shadow p-3" style={{ borderRadius: ".7em", marginBottom:"1.5em" }}>
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
                        <table class="table table-striped table-hover table-bordered" >
                            <thead>

                            </thead>
                            <tbody>

                                {states.map(({ stateName, id }, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <tr >
                                                <td>{stateName}</td>
                                                <td>
                                                    <a onClick={(event) => HandelDelete(id)} class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                                                    <Link to={`/EditState/${id}`} className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>
                                                </td>
                                                
                                                
                                            </tr>
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                        </div>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>{states.length}</b> out of {NumberOfPages}<b></b> entries</div>
                            <ul class="pagination">
                                {
                                    (() => new Array(Math.round(NumberOfPages / 2)).fill(0))().map((v, i) => {

                                        if (i == PageIndex) {
                                            return (
                                                <Fragment key={i}>
                                                    <li class="page-item mt-2 active"><a onClick={(event) => HandelPageination(i + 1)} class="page-link">{i + 1}</a></li>
                                                </Fragment>
                                            )
                                        }
                                        else {
                                            return (

                                                <Fragment key={i}>
                                                    <li class="page-item mt-2"><a onClick={(event) => HandelPageination(i + 1)} class="page-link">{i + 1}</a></li>
                                                </Fragment>
                                            )
                                        }
                                    })
                                }

                                <li class="page-item mt-2"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                </> : null}

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
                    <Button variant="primary" onClick={()=>{setDelete(true)}}>
                        yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}