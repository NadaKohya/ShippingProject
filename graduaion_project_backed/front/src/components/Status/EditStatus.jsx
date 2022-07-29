import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, edit } from "../../Services/Status";
import validator from 'validator';
import { decoder } from '../../common/baseUrl'


import { useNavigate } from "react-router-dom";
export default function EditStatus() {
  const { id } = useParams()
  const [statusName, setName] = useState("")
  const navigate = useNavigate();
  const [formErrors, setformErrors] = useState({});

  const handleChange = (e) => {
    setName(e.target.value)
  }
  let [role, SetRole] = useState("");

  useEffect(() => {
    SetRole(decoder(localStorage.getItem("userToken")).role)
    console.log(role)
  }, [])


  useEffect(() => {
    getById(id).then(data => {
      setName(data.data.statusName)
    })
  }, [])

  const whenSubmit = async () => {
    if (validate()) {
      try {
        await edit(id, { statusName: statusName })
        navigate("/Statuses");
      } catch ({ response: { data, status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }
    }
  };

  const validate = () => {
    const errors = {
      statusName: "",
      isValid: true,
    };

    if (!validator.isAlpha(statusName)) {
      errors.statusName = "the name is required and can only contain letters";
      errors.isValid = false;
    }

    setformErrors(errors);

    if (errors.isValid) {
      return true;
    }
  };


  return (
    <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
          <h1 className="mb-5" style={{ borderRadius: "1em" }}>Edit Status</h1>
          <div  style={{ borderRadius: "1em" }}>
      {role.includes('Admin')||role.includes('Emp') ?
        <>
        <div className="mt-3 p-4 shadow">
                 <div class="d-flex">
                   <input
              value={statusName}
              onChange={handleChange}
              name="statusName"
              type="text"
              aria-label="Username"
              className="shadow form-control" 
              style={{ borderRadius: ".5em", width: "50%" }} 
              aria-describedby="basic-addon1"
              requiredclass="d-flex"
            />
            <div>
              <small className=" text-danger" >{formErrors.statusName}</small>
            </div>
          </div>
          <div className="col-4 mt-3">
                      <button
            onClick={whenSubmit}
            className="m-auto"
            type="submit"
            style={{borderRadius:".3em",width:"5em",fontSize:"1.1em",color:"white", backgroundColor: "darkgreen", border: "1px solid darkgreen" }}
          >
            Edit
          </button>
          </div>
          </div>
        </> : null}
    </div>
    </div>
  );
}
