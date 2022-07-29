import React, { useState, useEffect } from 'react'
import "../Regions/Regions.css";
import regions from "../../assets/location.jpeg";
import { useParams } from "react-router-dom";
import { getById, edit } from '../../Services/City';
import { getAll } from "../../Services/State"
import { useNavigate } from "react-router-dom";
import { decoder } from '../../common/baseUrl'
import validator from 'validator';

export default function EditCity() {

    const { id } = useParams()
    const [states, setStates] = useState([])
    const [form, setForm] = useState({
        cityName:"",
        cityPerCost:0,
        stateId:0
    })
    const [formErrors, setFormErros] = useState({})
    const [serverError, setserverError] = useState(null)
    const navigate = useNavigate();

    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: (
                e.target.type == "number" ||
                e.target.type == "select-one"||e.target.value=="text"
            ) ? +e.target.value : e.target.value
        })
    }


    useState(() => {
        (async function () {
            const { data: city } = await getById(id)
            const { data: states } = await getAll()
            console.log(city);

            setStates(states)
        })()
    }, [])

    useEffect(() => {

        getById(id).then((Data) => {

            setForm({
                ...Data.data
            })
            console.log(form)

        })

            .catch((error) => {
                console.log(error)

            })
    }, [])
    const whenSubmit = async () => {
        if (validate()) {
            try {
                console.log(JSON.stringify(form))
                await edit(id, form)
                navigate("/Regions/cities");
            } catch ({ response: { data, status } }) {
                if (status == 401) {
                    navigate("/notAuthorized")
                }
            }
        }
    }


    const validate = () => {

        const errors = {
            cityName: "",
            costPerCity: "",
            stateId: "",
            isValid: true
        }


        if (!validator.isAlpha(form.cityName)||form.cityName=="" || form.cityName==null) {
            errors.cityName = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }

        if (form.costPerCity <= 0) {
            errors.costPerCity = "enter a valid number"
            errors.isValid = false
        }

        if (form.stateId == 0) {
            errors.stateId = "u must choose a state"
            errors.isValid = false
        }

        setFormErros(errors)

        if (errors.isValid) {
            return true
        }

    }

    return (
        <div>
    <img src={regions} className="region" style={{height:"43.4em"}}></img>
        <div>
            {role.includes('Admin')||role.includes('Emp')?
                <>
                    <div className="container p-5 shadow-lg  mt-5" style={{ borderRadius: "1em" }}>
                        <h1 className='mb-5'>Edit city</h1>
                        <div className='row'>
                            <div class=" mb-3 col-4 ">
                                <input value={form.cityName} style={{ borderRadius: ".5em" }} onChange={handleChange} name='cityName' type="text" class="form-control" placeholder="city name" aria-label="Username" aria-describedby="basic-addon1" />
                                <div>
                                    <small className=' text-danger'>{formErrors.cityName}</small>
                                </div>
                            </div>
                            <div class=" mb-3 col-4 ">
                                <input value={form.costPerCity} style={{ borderRadius: ".5em" }} onChange={handleChange} name='costPerCity' type="number" class="form-control" placeholder="city shipping cost" aria-label="Username" aria-describedby="basic-addon1" />
                                <div>
                                    <small className=' text-danger'>{formErrors.costPerCity}</small>
                                </div>
                            </div>
                            <div className='col-4 mb-3'>
                                <select value={form.stateId} style={{ borderRadius: ".5em" }} onChange={handleChange} name='stateId' class="form-select" aria-label="Default select example">
                                    <option value={0} selected>select state</option>
                                    {
                                        states.map(({ id, stateName }) => {
                                            return <option value={id}>{stateName}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <small className=' text-danger'>{formErrors.stateId}</small>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button onClick={whenSubmit} style={{ width: "6em", backgroundColor: "darkgreen", borderRadius: "0.5em", border: "1px solid darkgreen ", color: "white", fontSize: "1.2em", fontWeight: "500", padding: "0.5em" }} type='submit'>Edit</button>
                        </div>
                        <div>
                            <small className=' text-danger'>{serverError}</small>
                        </div>

                    </div>
                </> : null}
        </div>
        </div>
    )
}
