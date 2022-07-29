import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, edit } from "../../Services/Order";
import { getAll as getAllState } from "../../Services/State";
import { getAllPayment } from "../../Services/Payment";
import { getAllShipping } from "../../Services/Shipping";
import { getAllDelivery } from "../../Services/Delivery";
import { getAll } from "../../Services/City";
import { getAll as getAllStatus } from "../../Services/Status";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { decoder } from '../../common/baseUrl'
import './EditOrder.css'
export default function EditOrder() {

    const { id } = useParams();
    const [City, setCity] = useState([]);
    const [states, setStates] = useState([]);
    const [Status, setStatus] = useState([]);
    let [Payment, setPayment] = useState([]);
    let [Delivery, setDelivery] = useState([]);
    let [Shipping, setShipping] = useState([]);
    const navigate = useNavigate();

    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])

    const [error, setError] = useState({
        clientName: "",
        clientPhone: ""

    });


    let [Order, setOrder] = useState({
        cost: 0,
        clientName: "",
        clientPhone: "",
        stateId: 0,
        StatusId: 0,
        cityId: 0,
        deliveryId: 0,
        shippingId: 0,
        paymentId: 0,
        userId: ""
    });




    const handleInput = (e) => {
        setOrder({
            ...Order,
            [e.target.name]:
                e.target.type == "number" || e.target.type == "select-one"
                    ? +e.target.value
                    : e.target.value,
        });

        setError({
            clientName: "",
            clientPhone: ""
        })
    };
    useState(() => {
        (async function () {
            //const { data: Order } = await getById(id)
            const { data: City } = await getAll();
            const { data: states } = await getAllState();
            const { data: Status } = await getAllStatus();
            const { data: Shipping } = await getAllShipping();
            const { data: Payment } = await getAllPayment();
            const { data: Delivery } = await getAllDelivery();

            setStates(states);
            setCity(City);
            setStatus(Status);
            setShipping(Shipping);
            setPayment(Payment);
            setDelivery(Delivery);

        })();
    }, []);

    useEffect(() => {
        getById(id)
            .then((Data) => {
                console.log(Data.data);
                setOrder({
                    ...Data.data,
                    userId: decoder(localStorage.getItem("userToken")).id
                })

            })
            .catch((error) => {
                console.log(error);
            });

        console.log("d", decoder(localStorage.getItem("userToken")));

    }, []);


    function IsValidData() {
        if (!validator.isAlpha(Order.clientName)) {
            setError({
                ...error,
                clientName: " please Enter Valid user Name"
            })
            console.log(Order.clientName);
            return false;
        }
        let phonePattern = /^01[0|1|2][0-9]{8}$/g
        if (!phonePattern.test(Order.clientPhone) || Order.clientPhone == "") {
            setError({
                ...error,
                clientPhone: " please Enter Valid user phone"
            })
            return false;
        }

        return true;
    }
    const whenSubmit = async () => {

        console.log(IsValidData())
        if (IsValidData()) {
            try {
                console.log(JSON.stringify(Order))
                await edit(id, Order);
                navigate("/orderPage/Orders")
            } catch ({ response: { data, status } }) {
                if (status == 401) {
                    navigate("/notAuthorized")
                }

            }
        }
    };
    return (
        <>
            <div>
                {role.includes('Admin')||role.includes('Emp')?
                    <>
                        <div style={{ padding: "2em" }} className="container shadow bg-white pt-5">
                            <h1>Edit Order</h1>
                            <div>
                                <label className="EditLabel">Client Name</label>
                            </div>
                            <input
                                name="clientName"
                                Value={Order.clientName}
                                onChange={handleInput}
                                type="text"
                                class="form-control mt-2 p-2"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <div className="text-danger">{error.clientName}</div>


                            <div class=" mb-3">
                                <label className="EditLabel">Client Phone</label>
                                <input
                                    name="clientPhone"
                                    Value={Order.clientPhone}
                                    onChange={handleInput}
                                    type="Phone"
                                    class="form-control mt-2 p-2"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                                <div className="text-danger">{error.clientPhone}</div>
                            </div>

                            <label className="EditLabel">State</label>
                            <select
                                value={Order.stateId}
                                onChange={handleInput}
                                name="stateId"
                                class="form-select mt-2 p-2"
                                aria-label="Default select example"
                            >

                                {states.map(({ id, stateName }) => {
                                    return <option value={id}>{stateName}</option>;
                                })}
                            </select>
                            <div></div>
                            <label className="EditLabel">City</label>

                            <select
                                value={Order.cityId}
                                onChange={handleInput}
                                name="cityId"
                                class="form-select  mt-2 p-2"
                                aria-label="Default select example"
                            >

                                {City.map(({ id, cityName }) => {
                                    return <option value={id}>{cityName}</option>;
                                })}
                            </select>
                            <div></div>
                            <label className="EditLabel">Payment</label>


                            <select
                                value={Order.paymentId}
                                name="paymentId"
                                onChange={handleInput}
                                class="form-select mt-3"
                                aria-label="Default select example"
                            >
                                {Payment.map(({ id, paymentType }) => {
                                    return <option value={id}>{paymentType}</option>;
                                })}
                            </select>
                            <div></div>
                            <label className="EditLabel">Shipping</label>

                            <select
                                value={Order.shippingId}
                                name="shippingId"
                                onChange={handleInput}
                                class="form-select mt-3"
                                aria-label="Default select example"
                            >
                                {Shipping.map(({ id, shipName }) => {
                                    return <option value={id}>{shipName}</option>;
                                })}
                            </select>
                            <div></div>
                            <label className="EditLabel">Delivery</label>

                            <select
                                value={Order.deliveryId}
                                name="deliveryId"
                                onChange={handleInput}
                                class="form-select mt-3"
                                aria-label="Default select example"
                            >
                                {Delivery.map(({ id, deliveryName }) => {
                                    return <option value={id}>{deliveryName}</option>;
                                })}
                            </select>
                            <div></div>
                            <label className="EditLabel">Status</label>
                            <select
                                value={Order.statusId}
                                name="statusId"
                                onChange={handleInput}
                                class="form-select mt-3"
                                aria-label="Default select example"
                            >
                                {Status.map((status) => {
                                    return <option value={status.id}>{status.statusName}</option>;
                                })}
                            </select>
                            <label className="EditLabel">Cost</label>

                            <div class=" mb-3">
                                <input
                                    value={Order.cost}
                                    name="cost"
                                    onChange={handleInput}
                                    type="number"
                                    class="form-control mt-2 p-2"
                                    readOnly
                                    aria-describedby="basic-addon1"
                                />
                                <div>
                                    <small className=" text-danger"></small>
                                </div>
                            </div>

                            <div className="mt-5">
                                <button
                                    onClick={whenSubmit}
                                    className=" text-center"
                                    style={{ backgroundColor: "darkgreen", fontSize: "1.6em", width: "5em", color: "white", fontWeight: "500", border: "1px solid darkgreen", borderRadius: "0.3em" }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </> : null}

            </div>
        </>
    );
}
