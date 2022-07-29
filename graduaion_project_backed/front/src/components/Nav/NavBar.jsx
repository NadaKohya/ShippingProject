import './NavBar.css'
import { Outlet ,NavLink} from "react-router-dom"
import { useEffect, useState } from 'react';
import {TbLogout} from 'react-icons/tb';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import truck from'../../assets/logo.png';
import Figure from 'react-bootstrap/Figure';
import { Button } from 'react-bootstrap';

import {decoder} from '../../common/baseUrl'

export  function NavBar(params) {
  let[role,SetRole]=useState("");
    
  useEffect(()=>{
      SetRole(decoder(localStorage.getItem("userToken")).role)  
      console.log(role)
  },[])
  let SingOut=()=>
  {
localStorage.clear()
  }
 return (<>
  <header>
<nav className="navbar navbar-expand-md  ownbg">
  <a className="navbar-brand pl-5 ms-4"><img src={truck}/></a>
  <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </Button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink to="Main" className="nav-link" style={{color:"goldenrod",fontSize:"1.1em"}} >Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="OrderPage" style={{color:"goldenrod",fontSize:"1.1em"}}>Orders</NavLink>
      </li>
     {role.includes('Admin')||role.includes('Emp')? <>
      <li className="nav-item">
        <NavLink className="nav-link" to="Register" style={{color:"goldenrod",fontSize:"1.1em"}}>Users</NavLink>
      </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="Regions" style={{color:"goldenrod",fontSize:"1.1em"}}>Regions</NavLink>
      </li>  
      <li className="nav-item">
        <NavLink  className="nav-link" to="Branches" style={{color:"goldenrod",fontSize:"1.1em"}}>Branches</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  className="nav-link" to="Statuses" style={{color:"goldenrod",fontSize:"1.1em"}}>Statuses</NavLink>
      </li> 
      <li className="nav-item">
        <NavLink  className="nav-link" to="AddRole" style={{color:"goldenrod",fontSize:"1.1em"}}>Roles</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  className="nav-link" to="WeightSetting" style={{color:"goldenrod",fontSize:"1.1em"}}>Weight Settings</NavLink>
      </li>         
      </>:null} 
      <li className="nav-item">
        <NavLink  className="nav-link" onClick={SingOut} to="Login" style={{color:"goldenrod",fontSize:"1.1em",position:"absolute", right:"3em",fontSize:"1.4em",lineHeight:"2"}}><TbLogout/></NavLink>
      </li> 
    </ul>
  </div>  
</nav>
 </header>
 <div className="main_content">
               <Outlet />
             </div>
 </>
 )}
 