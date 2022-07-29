import { base ,config} from "../common/baseUrl"
import axios from "axios"

const stateBase=`${base}State`


export const GetAll=(pageNumber)=>{
   
    return axios.get(stateBase,{ params: { pageNumber } },config)
}

export const GetById=(id)=>{
    return axios.get(`${stateBase}/${id}`,config);
}
export const Add=(stateName)=>{
    console.log(stateName);
    return axios.post(stateBase, stateName ,config);
}
export const Delete=(id)=>{
    return axios.delete(`${stateBase}/${id}`,config);
}

export const getAll= ()=>{
    return axios.get(`${stateBase}/All`,config)
}
export const Edit=(id,stateName)=>{
    return axios.put(`${stateBase}/${id}`,stateName,config);
    
}