import { base, config } from "../common/baseUrl"
import axios from "axios"

const cityBase=`${base}City`


export const getAllWithPagination=(pageNumber)=>{
    console.log("first")
    return axios.get(`${cityBase}/pagination/${pageNumber}`,config)
}

export const getAll=()=>{
    return axios.get(`${cityBase}`,config)
}

export const add=(city)=>{
    return axios.post(cityBase,city,config)
}

export const edit=(id,city)=>{
    return axios.put(`${cityBase}/${id}`,city,config)
}

export const getById=(id)=>{
    return axios.get(`${cityBase}/${id}`,config)
}

export const deleteCity=(id)=>{
    return axios.delete(`${cityBase}/${id}`,config)
}





