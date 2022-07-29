import { base, config } from "../common/baseUrl"
import axios from "axios"

const branchUrl=`${base}Branche`



export const getAll=()=>{
    return axios.get(branchUrl,config)
}

export const add=(branch)=>{
    return axios.post(branchUrl,branch,config)
}

export const paginationaBaranches=(pageNumber)=>{
    console.log("first")
    return axios.get(`${branchUrl}/pagination/${pageNumber}`,config)
}

export const editBranch=(id,branch)=>{
    return axios.put(`${branchUrl}/${id}`,branch,config)
}

export const getById=(id)=>{
    return axios.get(`${branchUrl}/${id}`,config)
}

export const deleteBranch=(id)=>{
    return axios.delete(`${branchUrl}/${id}`,config)
}