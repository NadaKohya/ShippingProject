import { useState, useEffect } from 'react';
import "../Regions/Regions.css";
import regions from "../../assets/location.jpeg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Add, getAll } from '../../Services/State'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { decoder } from '../../common/baseUrl'

export default function AddState(params) {

  const [formErrors, setformErrors] = useState({
    StateName: "",

  })
  const [name, setName] = useState(
    {
      StateName: ""
    }
  );
  const [states, setStates] = useState([])

  const [isValid, setIsvalid] = useState(true);
  const navigate = useNavigate();

  const validate = () => {

    const errors = {
      StateName: "",
      isValid: true
    }

    if (name.StateName == "") {
      errors.StateName = "State Name is required"
      errors.isValid = false
    }

    if (name.cityId == 0) {
      errors.cityId = "u must choose a city"
      errors.isValid = false
    }

    setformErrors(errors)

    if (errors.isValid) {
      return true
    }

  }
  async function HandelAdd() {
    if (validate()) {
      try {
        console.log(JSON.stringify(name))
        console.log(name)
        await Add(name);
        navigate("/Regions/states");
      } catch ({ response: { data, status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }
    }


  }

  useState(() => {
    (async function () {
      const data = await getAll()
      setStates(data.data)
    })()
  }, [])
  let [role, SetRole] = useState("");

  useEffect(() => {
    SetRole(decoder(localStorage.getItem("userToken")).role)
    console.log(role)
  }, [])


  const handleChange = (e) => {
    console.log(e.target.type);
    setName({
      ...name,          //if input is select or number convert it to number
      [e.target.name]: (e.target.type == "number" || e.target.type == "select-one") ? +e.target.value : e.target.value
    })
  }
  return (
    <div>
    <img src={regions} className="region" style={{height:"43.4em"}}></img>
    <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
      <h1 className="mb-5">Add New State</h1>
      <Form style={{ borderRadius: "1em" }}>
        {role.includes('Admin')||role.includes('Emp') ?
          <>
            <Form.Group className="mt-3 p-4 shadow" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "400", fontSize: "1.2em" }}>Governorate Name</Form.Label>
              <div class="d-flex">
                <Form.Control onChange={handleChange} name="StateName" type="text" placeholder="name" class="shadow" style={{ borderRadius: ".5em", width: "50%" }} />
                <div className=' col-4'>
                  <Button className='m-auto  ' onClick={HandelAdd} style={{ backgroundColor: "darkgreen", border: "1px solid darkgreen" }} >
                    Add
                  </Button>
                </div>
              </div>
                <div>
                  <small className=' text-danger'>{formErrors.StateName}</small>
                </div>
            </Form.Group>

          </> : null}
      </Form>
      </div>
    </div>
  )
}