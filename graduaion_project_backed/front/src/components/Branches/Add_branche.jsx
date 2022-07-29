import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { add } from '../../Services/branch';
import { getAll } from "../../Services/City"
import { decoder } from '../../common/baseUrl'

export default function Add_branche() {
    const navigate = useNavigate();
    const [states, setStates] = useState([])
    const [serverError, setserverError] = useState(null)
    const [form, setForm] = useState({
        branchName: "",
        cityId: 0,
    })

    const [formErrors, setformErrors] = useState({
        branchName: "",
        cityId: "",
    })

    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    const handleChange = (e) => {
        console.log(e.target.type);
        setForm({
            ...form,          //if input is select or number convert it to number
            [e.target.name]: (e.target.type == "number" || e.target.type == "select-one") ? +e.target.value : e.target.value
        })
    }



    useState(() => {
        (async function () {
            const data = await getAll()
            setStates(data.data)
        })()
    }, [])

    const validate = () => {

        const errors = {
            branchName: "",
            cityId: "",
            isValid: true
        }

        if (form.branchName == "") {
            errors.branchName = "branchName is required"
            errors.isValid = false
        }

        if (form.cityId == 0) {
            errors.cityId = "u must choose a city"
            errors.isValid = false
        }

        setformErrors(errors)

        if (errors.isValid) {
            return true
        }

    }

    const whenSubmit = async () => {
        if (validate()) {
            try {
                console.log(JSON.stringify(form))
                await add(form)
                navigate("/branches")
            } catch ({ response: { status, data: { detail } } }) {
                if (status == 401) {
                    navigate("/notAuthorized")
                }
                setserverError(detail)
            }
        }
    }

    return (

        <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
                        {role.includes('Admin')||role.includes('Emp') ?
                <>
            <h1 className='mb-3 col-4'>Add Branch</h1>
            <div className="shadow bg-white p-4 container" style={{borderRadius:".7em"}}>
                    <div style={{ borderRadius: "1em" }}>
                <input onChange={handleChange} name='branchName' type="text" class="mb-3 form-control shadow" style={{ borderRadius: ".5em", width: "50%" }} placeholder="Branch Name" aria-label="Username" aria-describedby="basic-addon1" />
                <div>
                    <small className=' text-danger'>{formErrors.branchName}</small>
                </div>
            </div>
            <select onChange={handleChange} name='cityId' class="form-select shadow mb-3" style={{ borderRadius: ".5em", width: "50%" }} aria-label="Default select example">
                <option selected>select City</option>
                {states.map(({ id, cityName }) => {
                    return <option value={id}>{cityName}</option>
                })}
            </select>
            <div>
                <small className=' text-danger'>{formErrors.cityId}</small>
            </div>
            <div className='mt-4'>
                <button style={{ backgroundColor: "darkgreen", fontSize:"1.3em", border: "1px solid darkgreen", color:"white", margin:"0 0 -3em .5em",borderRadius:".4em",width:"6em" }}   onClick={whenSubmit} type='submit'>Add</button>
            </div>
            <div className=' mt-2 text-center'>
                <small className=' text-danger'>{serverError}</small>
            </div>
            </div>
            </> : null}

        </div>
    )
}


