import { base } from "../common/baseUrl"
import axios from "axios"

const paymentBase=`${base}Payment`


export const getAllPayment=()=>{
    return axios.get(paymentBase)
}

export const add=(payment)=>{
    return axios.post(paymentBase,payment)
}

export const edit=(id,payment)=>{
    return axios.put(`${paymentBase}/${id}`,payment)
}

export const getById=(id)=>{
    return axios.get(`${paymentBase}/${id}`)
}

export const deletePayment=(id)=>{
    return axios.delete(`${paymentBase}/${id}`)
}
