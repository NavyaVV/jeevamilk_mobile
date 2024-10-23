// import api from "..";

import api from "..";

// import { api } from "..";


export const login = (username,password) => {
    console.log("_____new__res+++++");
    return api.post('accounts/farmer-login/',{username:username,password:password});
}
export const registerDevice = (token) => {
    return api.post('accounts/register-device/',{fcm_token:token});
}
export const homeApi = () =>{
    return api.get('activities/farmer-homescreen-datas/');
}
export const profileDetail = () => {
    return api.get('activities/farmer-profile/')
}
export const graphDatas = () =>{
    return api.get('activities/farmer-quality-status-graph/')
}
export const farmerQuality = () =>{
    return api.get('activities/farmer-average-quality/')
}
export const cowsList = () => {
    return api.get('activities/farmer-cow-list/')
}
export const milkDetails = () => {
    return api.get('activities/farmer-milk-detail/')
}