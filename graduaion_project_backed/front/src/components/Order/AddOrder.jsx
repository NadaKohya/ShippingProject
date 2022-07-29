import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getAll } from "../../Services/City";
import { getAll as getAllBranch } from "../../Services/branch";
import { getAll as getAllState } from "../../Services/State";
import { add } from "../../Services/Order";
import { decoder } from "../../common/theDecoder";
import { get } from '../../Services/WeightSetting'
import { getAllPayment } from "../../Services/Payment"
import { getAllDelivery } from "../../Services/Delivery"
import { getAllShipping } from "../../Services/Shipping"

import { useNavigate } from "react-router-dom";
import validator from 'validator';
const token = localStorage.getItem("userToken")
let name;
let id;
if (token) {
  const { name: userName, id: userId } = decoder(token)
  id = userId;
  name = userName;
}


export default function AddOrder() {
  const [sellerName, setSellerName] = useState(
    token ? name : ""
  )
  const navigate = useNavigate();
  const [weghtAndCost, setWeghtAndCost] = useState({
    costInput: 0,
    weightInput: 0
  })
  const [tableError, setTableError] = useState("")

  let [Product, setProduct] = useState([]);

  let [ProductName, setProductName] = useState("");
  let [Quantity, setQuantity] = useState(0);
  let [Weigth, setWeigth] = useState(0);


  let [total, setTotal] = useState(0);
  let [City, setCity] = useState([{}]);
  let [CityCost, setCityCost] = useState(0);
  let [Payment, setPayment] = useState([]);
  let [Delivery, setDelivery] = useState([]);
  let [Shipping, setShipping] = useState([]);
  let [Branch, setBranch] = useState([]);
  let [State, setState] = useState([]);
  const [serverError, setserverError] = useState(null);


  let [error, setError] = useState({
    clientName: "",
    clientPhone: "",
    stateId: "",
    StatusId: "",
    deliveryId: "",
    shipId: "",
    paymentId: "",
    cityId: "",
    orderCost: ""
  });


  const [form, setForm] = useState({
    orderCost: 0,
    clientName: "",
    clientPhone: "",
    stateId: 0,
    StatusId: 1,
    cityId: 0,
    deliveryId: 0,
    shipId: 0,
    paymentId: 0,
    branchId: 0,
    userId: token ? id : "",
    date: new Date()
  });


  const [WeightSetting, SetWeightSetting] = useState({
    staticWeight: 0,
    staticCost: 0,
    costIncrease: 0
  })
  useEffect(() => {
    get().then(
      ({ data }) => {
        SetWeightSetting({
          staticWeight: data.staticWeight,
          staticCost: data.staticCost,
          costIncrease: data.costIncrease
        })
      }
    )
  }, [])

  useState(() => {
    (async function () {
      const data = await getAllShipping().then((ship) => {
        setShipping(ship.data)
        console.log(ship.data)
      }).catch((error) => {
        console.log(error)
      })

    })()



  }, [])
  useState(() => {

    (async function () {
      const data = await getAllPayment().then((pay) => {
        setPayment(pay.data)
        console.log(pay.data)
      }).catch((error) => {
        console.log(error)
      })

    })()


  }, [])

  useState(() => {

    (async function () {
      const data = await getAllDelivery().then((div) => {
        setDelivery(div.data)
        console.log(div.data)
      }).catch((error) => {
        console.log(error)
      })

    })()


  }, [])
  useEffect(() => {
    const products = Product
    if (products.length == 0) {
      setWeghtAndCost({
        costInput: 0,
        weightInput: 0
      })
      setForm({
        ...form,
        orderCost: 0
      })
    } else {
      setWeghtAndCost({
        costInput: OrderCost(),
        weightInput: calcWeight()
      })
      setForm({
        ...form,
        orderCost: OrderCost()
      })
    }
  }, [Product])



  const handleInput = (e) => {
    if (e.target.name == "cityId") {
      setCityCost(
        City.find((item) => {
          return item.id == e.target.value;
        })
      );
    }
    setForm({
      ...form,
      [e.target.name]:
        e.target.type == "number" || e.target.type == "select-one"
          ? +e.target.value
          : e.target.value,
    });
  };

  const whenSubmit = async () => {
    console.log(form);
    if (validate()) {
      try {
        console.log(JSON.stringify(form))
        await add(form);
        navigate("/OrderPage/Orders")
      } catch ({ response: { status } }) {
        if (status == 401) {
          navigate("/notAuthorized")
        }
      }
    }
  };

  let whenProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  let whenQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  let whenWeigthChange = (e) => {
    setWeigth(e.target.value);
  };


  //when add product
  let whenClick = () => {
    if (!parseInt(Quantity) || !parseInt(Weigth)) {
      setTableError("quantity and weight can only contains letters")
      return;
    }

    if (!CityCost || ProductName == "" || Quantity == 0 || Weigth == 0) {
      setTableError("you must choose city and u must fill the data")
      return;
    }

    setTableError("")
    setError({
      ...error,
      orderCost: ""
    })
    setProduct([
      ...Product,
      {
        id: generateId(),
        ProductName,
        Quantity,
        Weigth,
      },
    ]);
  };


  // get selectboxes Data
  useState(() => {
    (async function () {
      const data = await getAll()
        .then((city) => {
          setCity(city.data);
          console.log(city.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  useState(() => {
    (async function () {
      const data = await getAllState()
        .then((stat) => {
          setState(stat.data);
          console.log(stat.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  useState(() => {
    (async function () {
      const data = await getAllBranch()
        .then((branch) => {
          setBranch(branch.data);
          console.log(branch.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);


  //calculations
  const calcWeight = () => {
    return Product.reduce((total, currentValue) => {
      return total + +currentValue.Weigth;
    }, 0);
  }

  let OrderCost = () => {
    var total = calcWeight()
    console.log(WeightSetting);
    if (total > 0 && total <= WeightSetting.staticWeight) {
      return WeightSetting.staticCost + CityCost.staticCost;
    }
    if (total > WeightSetting.staticWeight) {
      return (total - WeightSetting.staticWeight) * WeightSetting.costIncrease + CityCost.costPerCity;
    }
  };


  const validate = () => {

    const errors = {
      orderCost: "",
      clientName: "",
      clientPhone: "",
      stateId: "",
      shipppingId: "",
      paymentId: "",
      deliveryId: "",
      cityId: "",
      branchId: "",
      isValid: true
    }

    if (!validator.isAlpha(form.clientName)) {
      errors.clientName = "the name is required can only have letters"
      errors.isValid = false
    }

    let phonePattern = /^01[0|1|2][0-9]{8}$/g
    if (!phonePattern.test(form.clientPhone)) {
      console.log(false);
      errors.clientPhone = "enter a valid phone"
      errors.isValid = false
    }

    // state
    if (form.stateId == 0) {
      errors.stateId = "you must choose state"
      errors.isValid = false
    }


    //   City
    if (form.cityId == 0) {
      errors.cityId = "you must choose city"
      errors.isValid = false
    }

    if (form.paymentId == 0) {
      errors.paymentId = "you must choose Payment Type"
      errors.isValid = false
    }

    if (form.deliveryId == 0) {
      errors.deliveryId = "you must choose Delivery Name"
      errors.isValid = false
    }

    if (form.shipId == 0) {
      errors.shipId = "you must choose Shipping Type"
      errors.isValid = false
    }

    if (form.branchId == 0) {
      errors.branchId = "you must choose Branch Name"
      errors.isValid = false
    }
    //   orderCost
    if (!form.orderCost) {
      errors.orderCost = "you must add products"
      errors.isValid = false
    }


    setError(errors)

    if (errors.isValid) {
      return true
    }

  }


  const generateId = () => {
    return ("" + Math.random()).substring(2)
  }

  const whenDelete = (id) => {
    const products = Product

    const out = products.filter((ele) => { return ele.id != id })
    setProduct(out)
  }
  let [role, SetRole] = useState("");

  useEffect(() => {
    SetRole(decoder(localStorage.getItem("userToken")).role)
    console.log(role)
  }, [])

  return (
    <div>
      {!(role.includes('Admin'))&&!(role.includes('Emp'))?
        <>
          <div className="AddOrders" >
            <div className="container mt-5 pt-5 shadow AddOrder bg-white" style={{ borderRadius: ".7em",border:"2px solid goldenrod",padding: "2em",borderRadius: "1em" }}>
              <h1 className="mb-5">Add New Order</h1>


              <div className="row">
                <div className=" col-3 ms-3">
                  <select
                    name="deliveryId"
                    onChange={handleInput}
                    class="form-select p-3"
                    aria-label="Default select example"
                    style={{ borderRadius: ".7em" }}
                  >
                    <option selected>Delivery Type</option>
                    {Delivery.map(({ id, deliveryName }) => {
                      return <option value={id}>{deliveryName}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.DeliveryId}</div>
                </div>
                <div class="col-4 ms-3">
                  <input
                    name="clientName"
                    onChange={handleInput}
                    type="text"
                    class="form-control p-3"
                    placeholder="Client Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ borderRadius: ".7em" }}
                  />
                  <div className="text-danger">{error.clientName}</div>
                </div>


                <div class=" col-4 ms-3">
                  <input
                    name="clientPhone"
                    onChange={handleInput}
                    type="text"
                    class="form-control  p-3 "
                    placeholder="Client Phone"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ borderRadius: ".7em" }}
                  />
                  <div className="text-danger">{error.clientPhone}</div>
                </div>
              </div>

              {/* Governate,City,Payment */}
              <div className="row">

                <div className="mt-4 ms-3  col-3">
                  <select
                    name="stateId"
                    onChange={handleInput}
                    class="form-select p-3"
                    aria-label="Default select example"
                    style={{ borderRadius: ".7em" }}
                  >
                    <option selected>Select Governorats</option>
                    {State.map(({ id, stateName }) => {
                      return <option className=" p-3" value={id}>{stateName}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.stateId}</div>
                </div>

                <div className="mt-4 ms-3  col-4">
                  <select
                    onChange={handleInput}
                    name="cityId"
                    class="form-select p-3"
                    aria-label="Default select example"
                  >
                    <option selected>Select City</option>
                    {City.map((city) => {
                      return <option value={city.id}>{city.cityName}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.cityId}</div>
                </div>
                <div className="col-4 ms-3">
                  <select
                    name="paymentId"
                    onChange={handleInput}
                    class="form-select mt-4 p-3"
                    aria-label="Default select example"
                    style={{ borderRadius: ".7em" }}
                  >
                    <option selected>Select Payment</option>
                    {Payment.map((pay) => {
                      return <option value={pay.id}>{pay.paymentType}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.PayId}</div>
                </div>
              </div>
              {/* Shipping */}
              <div className="row">
                <div className="col-3">
                  <select
                    name="branchId"
                    onChange={handleInput}
                    class="form-select mt-4 ms-3 p-3"
                    aria-label="Default select example"
                    style={{ borderRadius: ".7em" }}
                  >
                    <option selected>Select Branch</option>
                    {Branch.map((branch) => {
                      return <option value={branch.id}>{branch.branchName}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.branchId}</div>
                </div>
                <div className="col-4 ms-4">
                  <select
                    name="shipId"
                    onChange={handleInput}
                    class="form-select mt-3 p-3"
                    aria-label="Default select example"
                  >
                    <option selected>Select Shipping</option>
                    {Shipping.map(({ id, shipName }) => {
                      return <option value={id}>{shipName}</option>;
                    })}
                  </select>
                  <div className="text-danger">{error.shipId}</div>
                </div>
              </div>

              {/* ProductName */}

              <br></br><hr></hr>
              <br></br>
              <div className="row">
                <div className="col-3 ms-4">
                  <input
                    type="text"
                    name="ProductName"
                    onChange={whenProductNameChange}
                    className="form-control  p-3 mb-2"
                    placeholder="Product Name"
                    style={{ borderRadius: ".7em" }}
                    required
                  ></input>
                </div>
                <div className="col-3 ms-4">
                  <input required type="number" placeholder="Quantity" style={{ borderRadius: ".7em" }} className="form-control p-3 mb-2" name="Quantity" onChange={whenQuantityChange}></input>
                </div>
                <div className="col-3 ms-4">
                  <input required type="number" placeholder="Weigth" style={{ borderRadius: ".7em" }} className="form-control p-3 mb-2" name="Weigth" onChange={whenWeigthChange}></input>
                </div>
                <div className="col-2"><button className="btnAdd btn btn-success" onClick={whenClick}
                  style={{
                    marginLeft: "1em", backgroundColor: "darkgreen", border: "1px solid darkgreen", borderRadius: "8px",
                    width: "5em", color: "white", fontSize: "1.3em", lineHeight: "2", fontWeight: "600"
                  }}> + </button>
                </div>
              </div>
              <div>
                <small className=" text-danger" >{tableError}</small>
              </div>


              <Table striped bordered hover className="ms-3 mt-4" style={{ width: "98%", height: ".3em", borderRadius: ".7em" }}>
                <thead >
                  <tr >
                    <th style={{ fontSize: "1.2em", fontWeight: "500", textAlign: "center" }} className="p-3 justfyContent-Center">Product Name</th>
                    <th style={{ fontSize: "1.2em", fontWeight: "500", textAlign: "center" }} className="p-3 justfyContent-Center">Quantity</th>
                    <th style={{ fontSize: "1.2em", fontWeight: "500", textAlign: "center" }} className="p-3 justfyContent-Center">Weigth</th>
                  </tr>
                </thead>
                <tbody>
                  {Product.map((ele) => {
                    return (
                      <tr>
                        <td className="p-3 justfyContent-Center">{ele.ProductName}</td>
                        <td className="p-3 justfyContent-Center">{ele.Quantity}</td>
                        <td className="p-3 justfyContent-Center">{ele.Weigth}</td>
                        <td className=" text-center"><button onClick={() => whenDelete(ele.id)} style={{border:"1px solid brown",backgroundColor:"brown",color:"white"}} >delete</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <br></br>
              <hr></hr>
              <br></br>
              <div className="row">
                <div class="col-3 mb-3">
                  <input
                    name="orderCost"
                    onChange={handleInput}
                    type="number"
                    class="form-control mt-3 p-3"
                    readOnly
                    value={weghtAndCost.costInput}
                    placeholder="Order orderCost"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ borderRadius: ".7em" }}
                  />
                  <div>
                    <small className=" text-danger">{error.orderCost}</small>
                  </div>
                </div>
                <div class="col-3 mb-3">
                  <input
                    name="Total"
                    type="number"
                    class="form-control mt-3 p-3"
                    readOnly
                    value={weghtAndCost.weightInput}
                    placeholder="Total Weigth"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ borderRadius: ".7em" }}
                  />
                  <div>
                    <small className=" text-danger"></small>
                  </div>
                </div>

                <div class="col-6 mb-3">
                  <input
                    name="costPerCity"
                    type="text"
                    class="form-control mt-3 p-3"
                    placeholder="Notes"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ borderRadius: ".7em" }}
                  />
                  <div>
                    <small className=" text-danger"></small>
                  </div>
                </div>
              </div>
              <hr></hr>
              <br></br>
              <div class="col-12 mb-3">
                <h1>Seller Name</h1>
                <input
                  type="text"
                  class="form-control mt-3 p-3 col-3"
                  placeholder="Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={sellerName}
                />
                <div>
                  <small className=" text-danger"></small>
                </div>
              </div>
              <div className="col-4 mt-5">
                <button
                  style={{borderRadius:".3em", border:"1px solid darkgreen", backgroundColor:"darkgreen", color:"white", width:"4em",fontSize:"1.1em"}}
                  onClick={whenSubmit}
                  type="submit"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </> : null}

    </div>
  );
}
