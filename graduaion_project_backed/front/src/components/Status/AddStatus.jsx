import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { add } from "../../Services/Status";
import { useNavigate } from 'react-router-dom';
import { decoder } from '../../common/baseUrl'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AddStatus(props) {
  const [Name, SetName] = useState({ Name: "" });
  const navigate = useNavigate();

  const [formErrors, setformErrors] = useState({});

  const validate = () => {
    const errors = {
      Name: "",
      isValid: true,
    };

    const namePattern = /^([A-Z]|[a-z]){3,20}$/g
    if (Name.Name == "" || namePattern.test(Name.Name) == false) {
      errors.Name = "name is required and must be between 3 and 20";
      errors.isValid = false;
    }


    setformErrors(errors);

    if (errors.isValid) {
      return true;
    }
  };

  let [role, SetRole] = useState("");

  useEffect(() => {
    SetRole(decoder(localStorage.getItem("userToken")).role)
    console.log(role)
  }, [])


  const insertStatus = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await add(Name);
        navigate("/Statuses")
      } catch ({ response: { data, status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }
    }

  };
  const onchange = (e) => {
    SetName({ Name: e.target.value });
  };

  return (
    <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
      <h1 className="mb-5">Add Status</h1>
      <Form onSubmit={insertStatus} style={{ borderRadius: "1em" }}>
        {role.includes('Admin')||role.includes('Emp') ?
          <>
            <Form.Group className="mt-3 p-4 shadow" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "400", fontSize: "1.2em" }}>Status Name</Form.Label>
              <div class="d-flex">
                <Form.Control onChange={onchange} name="stateName" type="text" placeholder="name" class="shadow" style={{ borderRadius: ".5em", width: "50%" }} />

                <div className="text-danger">{formErrors.Name}</div>

                <div className=' col-4'>

                  <Button className='m-auto' type="submit" style={{ backgroundColor: "darkgreen", border: "1px solid darkgreen" }} >
                    Add
                  </Button>
                </div>
              </div>
            </Form.Group>
          </> : null}
      </Form>
    </div>

  );
}

export default AddStatus;
