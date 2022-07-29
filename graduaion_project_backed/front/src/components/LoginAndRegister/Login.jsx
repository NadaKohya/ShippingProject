import { Component, useState } from "react";
import './Login.css'
import { login } from '../../Services/LogIn&Register'
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../../assets/login.jpeg'

export default function Login() {

  let nav = useNavigate();
  const [userName, SetUserName] = useState("")
  const [password, Setpassword] = useState("")

  const [IsValiduserName, SetIsValidUserName] = useState(true)
  const [IsValidpassword, SetIsValidpassword] = useState(true)


  const [ServerErrors, SetServerErrors] = useState("")
  const [ISServerErrors, SetIsServerErrors] = useState(false)

  function HandleLogin(params) {
    if (!validator.isAlpha(userName) && validator.isEmpty(userName)) {
      SetIsValidUserName(false);
      return;
    }
    if (!validator.isStrongPassword(password, { minLength: 4 }) && validator.isEmpty(password)) {
      SetIsValidpassword(false);
      return;
    }
    login(userName, password).then(
      ({ data }) => {
        console.log("d", data)
        localStorage.setItem("userToken", data.token)
        console.log(data.token);
        nav('/')
      },
      (response) => {

        SetServerErrors("Please User Name or Password Correct");
        SetIsServerErrors(true);
      },
    );
  }
  function HandelInputName(e) {
    SetUserName(e.target.value);
    SetIsValidUserName(true);
  }
  function HandelInputPassword(e) {
    Setpassword(e.target.value);
    SetIsValidpassword(true);
  }
  return (
    //     <div class="wrapper">
    //     <div class="logo">
    //         <img src="http://img0cf.b8cdn.com/images/logo/44/1996944_logo_1549715449_n.png" alt=""></img>
    //     </div>
    //     <div class="text-center mt-4 name">
    //         Welcome Back
    //     </div>

    //         <div class="form-field d-flex align-items-center">
    //             <span class="far fa-user"></span>
    //             <input onChange={HandelInputName} type="text" name="userName" id="userName" placeholder="Username"></input>
    //              {!IsValiduserName?<span className="text-danger"> Please Enter valid Name</span>:null}
    //         </div>
    //         <div class="form-field d-flex align-items-center">
    //             <span class="fas fa-key"></span>
    //             <input onChange={HandelInputPassword} type="password" name="password" id="pwd" placeholder="Password"></input>
    //             {!IsValidpassword?<span className="text-danger"> Please Enter valid password</span>:null}

    //         </div>
    //                 <div>
    //                  {ISServerErrors?<span className="text-danger">{ServerErrors}</span>:null}
    //                 </div>
    //         <button class="btn mt-3" onClick={HandleLogin}>Login</button>


    // </div>
    <>
      <div className='d-flex'>

        <div  >

          <img className='imageLogine' src={loginImg}></img>

        </div>

      </div>
      <Form className="shadow FormLogin p-4">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={HandelInputName} id="userName" name="userName" type="text" className="'shadow p-2 mb-5 bg-white'" placeholder="Enter Username" />
          {!IsValiduserName ? <span className="text-danger"> Please Enter valid Name</span> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={HandelInputPassword} id="pwd" name="password" type="password" placeholder="Password" />
          {!IsValidpassword ? <span className="text-danger"> Please Enter valid password</span> : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <div>
          {ISServerErrors ? <span className="text-danger">{ServerErrors}</span> : null}
        </div>
        <Button className="btn" onClick={HandleLogin}>
          Submit
        </Button>
      </Form>
    </>
  )
}