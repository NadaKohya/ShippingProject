import { base } from "../common/baseUrl"
import axios from "axios"

const DeliveryBase=`${base}Delivery`


export const getAllDelivery=()=>{
    return axios.get(DeliveryBase)
}

export const add=(Delivery)=>{
    return axios.post(DeliveryBase,Delivery)
}

export const edit=(id,Delivery)=>{
    return axios.put(`${DeliveryBase}/${id}`,Delivery)
}

export const getById=(id)=>{
    return axios.get(`${DeliveryBase}/${id}`)
}

export const deleteDelivery=(id)=>{
    return axios.delete(`${DeliveryBase}/${id}`)
}
