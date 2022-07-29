import './style.css'
import { Outlet, NavLink } from "react-router-dom"
import { decoder } from '../../common/baseUrl'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import truck from '../../assets/logo.png';
import Figure from 'react-bootstrap/Figure';
export default function Home(params) {

    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    return (


        <ul>
            <li>  <NavLink to='Main' ><i className="fas fa-home"></i>Home</NavLink> </li>
            {role == 'Admin' ? <>
                <li>  <NavLink to='cities' ><i className="fas fa-city"></i>City</NavLink> </li>
                <li>  <NavLink to='Statuses' ><i className="fas fa-dove"></i>Status</NavLink> </li>
                <li>  <NavLink to='branches' ><i className="fas fa-code-branch"></i>Branch</NavLink> </li>
                <li>  <NavLink to='states' ><i className="fas fa-flag-usa"></i>States</NavLink> </li>
                <li>  <NavLink to='AddRole' ><i className="fas fa-flag-usa"></i>AddRole</NavLink> </li>
                <li>  <NavLink to='Register' ><i className="fas fa-user"></i>Add User</NavLink> </li>
                <li>  <NavLink to='WeightSetting' ><i className="fas fa-flag-usa"></i>WeghtSetting</NavLink> </li>
            </> : null}
            <li>  <NavLink to='Orders' ><i className="fas fa-dove"></i>Orders</NavLink> </li>

        </ul>

    )
}