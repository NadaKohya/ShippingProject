import { base ,config } from "../common/baseUrl"
import axios from "axios"

const WeightBase=`${base}Weight`


export const get=()=>{
    return axios.get(WeightBase,config)
}
export const edit=(setting)=>{
    return axios.put(`${WeightBase}`,setting)
}