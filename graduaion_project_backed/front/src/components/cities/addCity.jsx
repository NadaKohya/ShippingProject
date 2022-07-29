import React, { useEffect, useState } from 'react'
import { add } from '../../Services/City'
import { getAll } from "../../Services/State"
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { decoder } from '../../common/baseUrl'
import "../Regions/Regions.css";
import regions from "../../assets/location.jpeg";

export default function AddCity() {

    const navigate = useNavigate();
    const [states, setStates] = useState([])
    const [serverError, setserverError] = useState(null)
    const [form, setForm] = useState({
        cityName: "",
        costPerCity: 0,
        stateId: 0,
    })



    const [formErrors, setformErrors] = useState({
        cityName: "",
        costPerCity: "",
        stateId: "",
    })


    const handleChange = (e) => {
        setForm({
            ...form,          //if input is select or number convert it to number
            [e.target.name]: (e.target.type == "number" || e.target.type == "select-one") ? +e.target.value : e.target.value
        })
    }



    useEffect(() => {
        (async function () {
            const data = await getAll()
            setStates(data.data)
        })()
    }, [])

    const validate = () => {

        const errors = {
            name: "",
            costPerCity: "",
            stateId: "",
            isValid: true
        }




        if (!validator.isAlpha(form.cityName)||form.cityName=="" || form.cityName==null) {
            errors.cityName = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }


        if (form.costPerCity == 0) {
            errors.costPerCity = "costPerCity is required"
            errors.isValid = false
        }

        if (form.stateId == 0) {
            errors.stateId = "u must choose a state"
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
                navigate("/Regions/cities")
            } catch ({ response: { status } }) {
                if (status == 401) {
                    navigate("/notAuthorized")
                }
            }
        }
    }

    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    return (
        <div>
    <img src={regions} className="region" style={{height:"43.4em"}}></img>
        <div>
            {role.includes('Admin')||role.includes('Emp') ?
                <>
        <div className="container p-5 shadow-lg  mt-5" style={{ borderRadius: "1em" }}>
                    <h1 className='mb-5'>Add city</h1>
                    <div className='row'>
                        <div class=" mb-3 col-4 ">
                            <input onChange={handleChange} style={{ borderRadius: ".5em" }} name='cityName' type="text" class="form-control p-2" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
                            <div>
                                <small className=' text-danger'>{formErrors.cityName}</small>
                            </div>
                        </div>
                        <div class=" mb-3 col-4">
                            <input onChange={handleChange} style={{ borderRadius: ".5em" }} name='costPerCity' type="number" class="form-control p-2" placeholder="city shipping cost" aria-label="Username" aria-describedby="basic-addon1" />
                            <div>
                                <small className=' text-danger'>{formErrors.costPerCity}</small>
                            </div>
                        </div>
                        <div className='col-4'>
                            <select onChange={handleChange} style={{ borderRadius: ".5em" }} name='stateId' class="form-select p-2" aria-label="Default select example">
                                <option selected>select state</option>
                                {states.map(({ id, stateName }) => {
                                    return <option value={id}>{stateName}</option>
                                })}
                            </select>
                            <div>
                                <small className=' text-danger'>{formErrors.stateId}</small>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button onClick={whenSubmit} style={{ width: "6em", backgroundColor: "darkgreen", borderRadius: "0.5em", border: "1px solid darkgreen ", color: "white", fontSize: "1.2em", fontWeight: "500", padding: "0.5em" }} type='submit'>Add</button>
                    </div>
                    <div className=' mt-2 text-center'>
                        <small className=' text-danger'>{serverError}</small>
                    </div>

        </div>
                </> : null}
        </div>
        </div>
    )
}
