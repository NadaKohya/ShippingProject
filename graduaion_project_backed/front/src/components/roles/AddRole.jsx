import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getAll as getControllers } from "../../Services/Controller"
import { getAll as getPermissions } from "../../Services/permission"
import { useNavigate } from "react-router-dom";
import { addPermissionRoleController } from '../../Services/Roles';
import { decoder } from '../../common/baseUrl'
import validator from 'validator';

export default function AddRole() {
    const navigate = useNavigate();
    const [pc, setPc] = useState({
        permissions: [],
        controllers: [],
        roleName: ""
    })

    const [Errors,setErrors]=useState({
        nameErr:"",
        roleErr:""
    })

    const [form, setForm] = useState({})

    useEffect(() => {
        (async function () {
            const { data: permissions } = await getPermissions()
            const { data: controllers } = await getControllers()
            console.log(permissions)
            setPc({
                ...pc,
                permissions,
                controllers
            })
            assignControllersToFormState(controllers)
        }
        )()
    }, [])


    const whenSubmit = async () => {
        if (validate()) {
            const { arr: emptyIdsArray, hasEmptyArr } = checkIfIncludesEmptyArray()
            const finalStateToSend = filterEmptyBeforeSend(emptyIdsArray)
            setForm(finalStateToSend)
            try {
                if (hasEmptyArr) {
                    await addPermissionRoleController(finalStateToSend)
                } else {
                    await addPermissionRoleController(form)
                }
                navigate("/")
            } catch (err) {
                console.log(err);
            }
        }
    }


    const handleChange = ({ target: myInput }, controllerId, permissionId) => {
        if (myInput.checked) {
            add(controllerId, permissionId)
            return;
        }
        remove(controllerId, permissionId)
    }

    const add = (controllerId, permissionId) => {
        const myForm = form
        const myArr = myForm.permissionMat[controllerId]
        myForm.permissionMat[controllerId] = [...myArr, permissionId]
        setForm({ ...myForm })
    }

    const remove = (controllerId, permissionId) => {
        const myForm = form
        const myArr = myForm.permissionMat[controllerId]
        myForm.permissionMat[controllerId] = [...myArr.filter(ele => { return ele !== permissionId })]
        setForm({ ...myForm })
    }


    const assignControllersToFormState = (controllers) => {
        const initialForm = {
            permissionMat: {

            },
            roleName: ""
        }
        controllers.forEach(({ id }) => {
            initialForm.permissionMat[id] = []
        })
        setForm(initialForm)
    }


    const checkIfIncludesEmptyArray = () => {
        let out = {
            arr: [],
            hasEmptyArr: false
        }
        for (const property in form["permissionMat"]) {
            if (form["permissionMat"][property].length == 0) {
                out.arr.push(+property)
                out.hasEmptyArr = true
            }
        }
        return out;
    }

    const filterEmptyBeforeSend = (emptyIdsArr) => {
        const myForm = form
        const ArraysObj = myForm.permissionMat;
        let out = {}

        //extract non-empty arrays
        for (const prop in ArraysObj) {
            if (!emptyIdsArr.includes(+prop)) {
                out[prop] = ArraysObj[prop]
            }
        }

        myForm.permissionMat = out;
        return myForm
    }


    const formIsEmpty = () => {
        const myForm = form
        for (const prop in myForm.permissionMat) {
            if (myForm.permissionMat[prop].length !== 0) {
                return false;
            }
        }
        return true;
    }


    const handleChangeName = (e) => {
        setForm({
            ...form,
            roleName: e.target.value
        })
    }



    const validate = () => {
        let nameError = "";
        let roleErorr = ""

        if (!validator.isAlpha(form.roleName)) {
            nameError = "the name is required and must be  only letters"
        }


        if (formIsEmpty()) {
            console.log("object");
            roleErorr = "u must choose permission"
        }

        setErrors({
            ...Errors,
            nameErr:nameError,
            roleErr:roleErorr
        })

        if (nameError.length == 0 && roleErorr.length == 0) {
            return true
        }
    }
    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])


    return (
        <div className="container col-9 shadow-lg mt-5" style={{border:"2px solid goldenrod", borderRadius:"1em"}}>
             {role == "Admin" ?
             <>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div class="input-group shadow m-auto" style={{width:"25em"}} >
                            <div class="input-group-prepend">
                                <button onClick={whenSubmit}style={{border:"1px solid goldenrod", backgroundColor:"goldenrod", color:"white",padding:".7em",fontSize:"1.2em",borderRadius:".3em 0 0 .3em"}} type="button">Add Role</button>
                            </div>
                            <input onChange={handleChangeName} type="text" style={{width:"18.38em",border:"none",borderRadius:"0 .3em .3em 0"}} placeholder="" aria-label="" aria-describedby="basic-addon1" />
                        <div className='w-75 mx-auto'>
                            <small className=' text-danger'>{Errors.nameErr}</small>
                        </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered mt-4">
                        <thead>
                            <tr>
                                <th className=' text-center'>Page</th>
                                {pc.permissions.map(({ id, premssionName }) => { return <th className=' text-center'>{premssionName}</th> })}
                            </tr>
                        </thead>
                        <tbody>
                            {pc.controllers.map(({ id: controllerId, entityName }) => {
                                return <tr>
                                    {
                                        <td className='text-center'>{entityName}</td>
                                    }
                                    {pc.permissions.map(({ id: permissionId, name }) => { return <td className=' text-center'><input onChange={(e) => handleChange(e, controllerId, permissionId)} type="checkbox" /></td> })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className='w-75 mx-auto'>
                        <small className=' text-danger'>{Errors.roleErr}</small>
                    </div>
                </div>
            </div>
            </> : null}
        </div>
    )
}
