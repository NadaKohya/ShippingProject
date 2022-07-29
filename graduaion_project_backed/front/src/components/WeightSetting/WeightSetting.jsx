import { useEffect, useState } from 'react'
import { edit, get } from '../../Services/WeightSetting'
import { decoder } from '../../common/baseUrl'

export default function WeightSetting(params) {


    let [staticWeight, setstaticWeight] = useState(0)
    let [staticCost, setstaticCost] = useState(0)
    let [costIncrease, setcostIncrease] = useState(0)
    function HandeSaveWeight(params) {

        edit({
            staticWeight: +staticWeight,
            staticCost: +staticCost,
            costIncrease: +costIncrease
        })
    }
    let [role, SetRole] = useState("");

    useEffect(() => {
        SetRole(decoder(localStorage.getItem("userToken")).role)
        console.log(role)
    }, [])
    useEffect(() => {
        get().then(
            ({ data }) => {
                setstaticWeight(data.staticWeight);
                setstaticCost(data.staticCost);
                setcostIncrease(data.costIncrease);
            }
        )
    },
        [])
    return (
        <div className="col-4 m-auto mt-5 shadow-lg p-4" style={{borderRadius:"1em", border:"2px solid goldenrod"}}>
            {role.includes('Admin')||role.includes('Emp') ?
                <>
                    <div className="form-group">
                        <label for="exampleInputEmail1" style={{margin:".3em",fontWeight:"500"}}>Default Weight</label>
                        <input type="number" value={staticWeight} onChange={(e) => { setstaticWeight(e.target.value) }} className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Weight" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1" style={{margin:".3em",fontWeight:"500"}}>Default Cost</label>
                        <input type="number" value={staticCost} onChange={(e) => { setstaticCost(e.target.value) }} className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cost" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1" style={{margin:".3em",fontWeight:"500"}}>Extra Cost</label>
                        <input type="number" value={costIncrease} onChange={(e) => { setcostIncrease(e.target.value) }} className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cost" />
                    </div>

                    <button onClick={HandeSaveWeight} style={{border:"1px solid darkgreen", width:"4em", borderRadius:".3em", backgroundColor:"darkgreen", color:"white", margin:"1em 0em 0em 9.3em ",fontSize:"1.2em"}}>Save</button>
                </> : null}
        </div>
    )
}