import { base } from "../common/baseUrl"
import axios from "axios"

const ShippingBase=`${base}Shipping`


export const getAllShipping=()=>{
    return axios.get(ShippingBase)
}

export const add=(Shipping)=>{
    return axios.post(ShippingBase,Shipping)
}

export const edit=(id,Shipping)=>{
    return axios.put(`${ShippingBase}/${id}`,Shipping)
}

export const getById=(id)=>{
    return axios.get(`${ShippingBase}/${id}`)
}

export const deleteShipping=(id)=>{
    return axios.delete(`${ShippingBase}/${id}`)
}
