import { Component, useState } from "react";
import React, { useEffect } from 'react'
import { getAll, getById, getAllOrderCountUserId, getAllOrderCount } from "../../Services/Status";
import { decoder } from './../../common/baseUrl';
import { IoBagHandleOutline } from 'react-icons/io5';
import './Main.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Main() {
  const [StatusName, setStatuseName] = useState("")
  const [Status, setCardsStatus] = useState([]);
  const id = decoder(localStorage.getItem("userToken")).id
  const role = decoder(localStorage.getItem("userToken")).role
  useEffect(() => {
    if (role == "EMPLOYEE" || role == "Admin") {
      getAllOrderCount().then(({ data }) => {
        setCardsStatus(data);
        console.log(data);
      });
    }
    else {
      getAllOrderCountUserId(id).then(({ data }) => {
        setCardsStatus(data);
        console.log(data);
      })
    }
  }, []);




  return (
    <>
      <div className="board d-flex">

        <div className="card-group container-fluid">
          {Status.map(({ statusName, orderCount }) => {
            return (
              <div className="cards shadow p-3 mb-5 bg-white d-flex">


                <div><h6>Name : {statusName}</h6>
                  <p>Count : {orderCount}</p></div>
                <div className="icon">
                  <IoBagHandleOutline></IoBagHandleOutline>

                </div>

              </div>
              // <div className="card m-5">
              //     <img src="https://www.shipbob.com/wp-content/uploads/2019/12/iStock-692898468-2.jpg" className="card-img-top" alt="..." />
              //     <div className="card-body">
              //       <h5 className="card-title">Status Name : {statusName}</h5>
              //       <p className="card-text">
              //         <small className="text-muted">
              //           Order Count : {orderCount}
              //         </small>
              //       </p>
              //     </div>
              //   </div> 
            );
          })}
        </div>
      </div>
    </>
  );
}