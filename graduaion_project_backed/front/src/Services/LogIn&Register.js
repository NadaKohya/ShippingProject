import { base } from "../common/baseUrl"
import axios from "axios"

const AccountBase=`${base}Account`;

export const login=(userName,password)=>{
    return axios.post(`${AccountBase}/login`,{userName, password})
}

export const register=(userName,password,confirmPassword,roleName)=>{

    return axios.post(`${AccountBase}/register`,{
        userName,
        password,
        confirmPassword,
        roleName})
}
