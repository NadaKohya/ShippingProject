import { base ,config} from "../common/baseUrl"
import axios from "axios"

const roleBase=`${base}Role`
const PermissionRoleController=`${base}GenreatePermsion`



export const getAll=()=>{
    return axios.get(`${roleBase}`,config)
}

export const addPermissionRoleController=(row)=>{
    return axios.post(`${PermissionRoleController}`,row,config)
}
