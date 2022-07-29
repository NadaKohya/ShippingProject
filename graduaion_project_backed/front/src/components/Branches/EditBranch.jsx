import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getAll } from "../../Services/City"
import { getById, editBranch } from '../../Services/branch';
import { decoder } from '../../common/baseUrl'
import validator from 'validator';

export default function EditBranch() {
    const { id } = useParams()
    const [cities, setStates] = useState([])
    const [form, setForm] = useState({
        branchId: "",
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
                e.target.type == "select-one"
            ) ? +e.target.value : e.target.value
        })
    }


    useState(() => {
        (async function () {
            const { data: branch } = await getById(id)
            const { data: cities } = await getAll()
            console.log(branch);
            setStates(cities)
        })()
    }, [])
    useEffect(() => {

        getById(id).then((Data) => {

            setForm({
                ...Data.data
            })

        })

            .catch((error) => {
                console.log(error)

            })
    }, [])


    const whenSubmit = async () => {
        if (validate()) {
            try {
                console.log(JSON.stringify(form))
                await editBranch(id, form)
                navigate("/branches");
            } catch ({ response: { status, data: { detail } } }) {
                console.log("nk")
                navigate("/notAuthorized")
                setserverError(detail)
            }
        }
    }


    const validate = () => {

        const errors = {
            branchName: "",
            cityId: "",
            isValid: true
        }


        if (!validator.isAlpha(form.branchName)) {
            errors.branchName = "the name must be between 3 to 20 chars and can only have letters"
            errors.isValid = false
        }


        if (form.cityId == 0) {
            errors.cityId = "u must choose a city"
            errors.isValid = false
        }

        setFormErros(errors)

        if (errors.isValid) {
            return true
        }

    }

    return (
        <div className="container mt-5 shadow AddOrder bg-white" style={{ padding: "2em", borderRadius: "1em" }}>
            {role.includes('Admin')||role.includes('Emp') ?
                <>
                    <h1 className='mb-3 col-4'>Edit Branch</h1>
                <div className="shadow bg-white p-4 container" style={{borderRadius:".7em"}}>
                    <div style={{ borderRadius: "1em" }}>
                        <input value={form.branchName} onChange={handleChange} name='branchName' type="text" class="form-control shadow mb-3" style={{ borderRadius: ".5em", width: "50%" }} placeholder="Branch name" aria-label="Username" aria-describedby="basic-addon1" />
                        <div>
                            <small className=' text-danger'>{formErrors.branchName}</small>
                        </div>
                    </div>
                    <select value={form.cityId} onChange={handleChange} name='cityId' class="form-select shadow" style={{ borderRadius: ".5em", width: "50%" }} aria-label="Default select example">
                        <option value={form.cityName} selected>Select City</option>
                        {
                            cities.map(({ id, cityName }) => {
                                return <option value={id}>{cityName}</option>
                            })
                        }
                    </select>
                    <div>
                        <small className=' text-danger'>{formErrors.cityId}</small>
                    </div>
                    <div className='mt-4'>
                        <button style={{ backgroundColor: "darkgreen", fontSize:"1.3em", border: "1px solid darkgreen", color:"white", margin:"0 0 -4em .5em",borderRadius:".4em",width:"6em" }}  onClick={whenSubmit} className='text-center' type='submit'>Edit</button>
                    </div>
                    <div>
                        <small className=' text-danger'>{serverError}</small>
                    </div>
                    </div>
                </> : null}
        </div>
    )
}
