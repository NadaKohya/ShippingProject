import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

import ShowCities from './components/cities/ShowCities';
import AddCity from './components/cities/addCity';
import AddStatus from './components/Status/AddStatus';
import ShowBranches from './components/Branches/ShowBranches';
import EditCity from './components/cities/EditCity';
import EditBranch from './components/Branches/EditBranch';
import Add_branche from './components/Branches/Add_branche';
import AddState from './components/state/AddState';
import ShowStates from './components/state/ShowStates';
import EditState from './components/state/EditState';
import AddRole from './components/roles/AddRole';
import ShowStatuses from './components/Status/ShowStatuses';
import EditStatus from './components/Status/EditStatus';
import Register from './components/LoginAndRegister/Register';
import Login from './components/LoginAndRegister/Login';
import Home from './components/Home/Home';
import ShowOrderss from './components/Order/ShowOrders';
import OrderPage from './components/Order/OrdersPage';
import AddOrder from './components/Order/AddOrder';
import EditOrder from './components/Order/EditOrder';
import Main from './components/Main/Main';
import WeightSetting from './components/WeightSetting/WeightSetting';
import UnAuthorized from './components/authorization/UnAuthorized';
import { NavBar } from './components/Nav/NavBar';
import Regions from './components/Regions/Regions';



function App() {

  console.log(process.env.base)
  return (
   
    <div className="App">
      
      <Routes >
        <Route path="/Login" element={<Login />}></Route>
        <Route path='/' element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Main" element={<Main />}></Route>
         <Route path='OrderPage' element={<OrderPage/>}>
        <Route path="addOrder" element={<AddOrder />}></Route>
        <Route path="Orders" element={<ShowOrderss />}></Route>
        </Route>
            
          <Route path="Regions" element={<Regions />}>
          <Route path="cities" element={<ShowCities />}></Route>
          <Route path="states" element={<ShowStates />}></Route>
          </Route>
          <Route path="/addCity" element={<AddCity />}></Route>
          <Route path="/editCity/:id" element={<EditCity />}></Route>
          <Route path="/AddStatus" element={<AddStatus />}></Route>
          <Route path="/EditStatus/:id" element={<EditStatus />}></Route>
          <Route path="/Statuses" element={<ShowStatuses />}></Route>
          <Route path="/branches" element={<ShowBranches />}></Route>
          <Route path="/editBranch/:id" element={<EditBranch />}></Route>
          <Route path="/addBranch" element={<Add_branche />}></Route>
          <Route path="/editState/:id" element={<EditState />}></Route>
          <Route path="/addState" element={<AddState />}></Route>
          {/*<Route path="/Order" element={<Order/>}></Route>*/}
          <Route path="/editOrder/:id" element={<EditOrder />}></Route>
          <Route path="/AddRole" element={<AddRole />}></Route>
          <Route path="/Main" element={<Main />}></Route>
          <Route path="/WeightSetting" element={<WeightSetting />}></Route>
          <Route path="/notAuthorized" element={<UnAuthorized />}></Route>
        </Route>
      </Routes>

    </div >
  );
}

export default App;
