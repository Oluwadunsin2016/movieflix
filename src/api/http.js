import axios from "axios";

// export const host = 'http://localhost:5000/api';
export const host = 'https://movieflix-backend-xi.vercel.app/api';
const http = axios.create({
    baseURL:host
})

http.interceptors.request.use((config)=>{
    const { intercept=true } = config;
    if(!intercept) return config;
    const token = localStorage.getItem("movieToken")
    if (token) config.headers.Authorization=`Bearer ${token}`;
    return config;
})

export default http