import { base,config} from "../common/baseUrl"
import axios from "axios"

const OrderBase = `${base}Order`


export const getAllOrder = () => {
    return axios.get(OrderBase,config)
}

export const getAllOrderBySellerId = (id) => {
    return axios.get(`${OrderBase}/seller/${id}`,config)
}

export const getById = (id) => {
    return axios.get(`${OrderBase}/${id}`,config)
}
export const add = (order) => {
    return axios.post(OrderBase, order,config)
}

export const edit = (id, order) => {
    return axios.put(`${OrderBase}/${id}`, order,config)
}

export const deleteOrder = (id) => {
    return axios.delete(`${OrderBase}/${id}`,config)
}
export const getByStatus = (Statusid, PageId) => {

    return axios.get(`${OrderBase}/s/${Statusid}?pageIndex=${PageId}`,config)

}

// export const getByStatusAndDate=(StartDate,EndDate,Statusid,PageId)=>{

//     return axios.get(`${OrderBase}/ss/${Statusid}?start=${StartDate}&end=${EndDate}&pageIndex=${PageId}`)

// }
export const getByStatusAndDate=(StatusData)=>{

        return axios.get(`${OrderBase}/ss/${StatusData.Statusid}?start=${StatusData.StartDate}&end=${StatusData.EndDate}&pageIndex=${StatusData.PageId}`)
    
     }

