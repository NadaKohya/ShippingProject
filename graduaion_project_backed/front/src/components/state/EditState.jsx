import { useEffect, useState } from 'react';
import "../Regions/Regions.css";
import regions from "../../assets/location.jpeg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Edit, GetById } from '../../Services/State'
import validator from 'validator';
import { useParams, useNavigate } from "react-router-dom";
import { decoder } from '../../common/baseUrl'
export default function EditState(params) {

  const [form, setForm] = useState({
    stateName:""
  });
  const [isValid, setIsvalid] = useState(true);
  const { id } = useParams()
  const navigate = useNavigate();
  
  useState(() => {
    (async function () {
      const { data: state } = await GetById(id)
      console.log(state);
    })()
  }, [])
  useEffect(() => {

    GetById(id).then((Data) => {

      console.log(Data)
      setForm({
        ...Data.data
      })

    })

      .catch((error) => {
        console.log(error)

      })
  }, [])
  let [role, SetRole] = useState("");

  useEffect(() => {
      SetRole(decoder(localStorage.getItem("userToken")).role)
      console.log(role)
  }, [])
  

  async function HandelEdit() {

      try {
        console.log(JSON.stringify(form))
        console.log(form)
        await Edit(id, {stateName:form.stateName});
        navigate("/Regions/states")

      } catch ({ response: { data, status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }

  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: (
        e.target.type == "number" ||
        e.target.type == "select-one"
      ) ? +e.target.value : e.target.value
    })
  }
  return (
    <div>
    <img src={regions} className="region" style={{height:"43.4em"}}></img>
    <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
      <h1 className="mb-5 col-4">Edit Governorate</h1>
    <Form style={{ borderRadius: "1em" }}>
      {role.includes('Admin')||role.includes('Emp') ?
        <>
          <Form.Group className="mt-3 p-4 shadow" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "400", fontSize: "1.2em" }}>State Name</Form.Label>
            <div class="d-flex">
            <Form.Control class="shadow" style={{ borderRadius: ".5em", width: "50%" }} name="stateName" onChange={handleChange} type="text" placeholder="name" Value={form.stateName} />
            {
              !isValid ? <small id="emailHelp" class="form-text text-muted">please enter valid name </small>
                : null
            }
             <div className="col-4">
            <Button className='m-auto'onClick={HandelEdit} style={{ backgroundColor: "darkgreen", border: "1px solid darkgreen" }}>
              Save
            </Button>
          </div>
          </div>
          </Form.Group>
         
        </> : null}

    </Form>
    </div>
    </div>
  )
}