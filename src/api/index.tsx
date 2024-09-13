import axios from "axios";

export interface ITextResponse {
    msg: string
}

export const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000 
})