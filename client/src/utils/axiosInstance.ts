import axios from 'axios'
export const AXIOS_INSTANCE = axios.create({
    baseURL: process.env.SERVER,
    withCredentials: true
})