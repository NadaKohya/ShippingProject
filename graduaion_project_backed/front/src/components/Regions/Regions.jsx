import "./Regions.css";
import regions from "../../assets/location.jpeg";
import { Link, Outlet } from "react-router-dom";

export function Regions() {

    return (

        <div>

            <div className="NavRegion m-auto col-4 d-flex" style={{ justifyContent: "center" }}>

                <div > <Link 

                    to={"states"}
                    className="nav-item nav-link active"
                    style={{ color: "white", marginRight: "2em" }}
                >
                    Governorates
                </Link>
                </div>
                <div>
                    <Link
                        to={"cities"}
                        className="nav-item nav-link"
                        style={{ color: "white", textAlign: "center" }}
                    >

                        Cities

                    </Link>

                </div>

            </div>
            <Outlet />

            <img src={regions} className="region"></img>

            <div>

            </div>

        </div>

    );

}



export default Regions;