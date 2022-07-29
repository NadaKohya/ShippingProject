import {ImTable2} from'react-icons/im';
import {MdAddShoppingCart} from'react-icons/md';
import{TbReportAnalytics} from'react-icons/tb'
import { Link, Outlet } from 'react-router-dom';
import'./OrderPage.css'
export default function OrderPage() {
        return(
    <div>
        <div className="iconsOrder d-flex">

<Link className="categoryOrder shadow-lg mb-2" to={'Orders'}>

<div class='iconOrder1'><ImTable2/></div>

</Link>
<Link className="categoryOrder shadow-lg mb-2" to={'addOrder'}>

<div class='iconOrder3'><MdAddShoppingCart/></div>

</Link>
</div>
<div style={{marginTop:"-6em"}}>
<Outlet/>
</div>
</div>
)
}