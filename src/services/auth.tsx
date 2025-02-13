import axios from "axios";
import { ILoginUserData, IRegisterUserData } from "../domain/AuthDto";



export default async function sign_up(registerData: IRegisterUserData): Promise<string> {

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const REGISTER_URL = import.meta.env.VITE_FEATURE_REGISTER;

    try{
        
        if (!BASE_URL || !REGISTER_URL) {
            throw new Error("API base URL or register URL is not defined in the environment variables.");
            
        }
        console.log(registerData);
        console.log(`${BASE_URL}${REGISTER_URL}`);
        const response = await axios.post(`${BASE_URL}${REGISTER_URL}`, registerData,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201) {
            return "user registered successfully";
        } else if(response.status === 400) {
            
            return "Registration failed";
        }
    } catch (error){
        console.error(error);
        return "";
    }
    return "Unexpected error";
}


export  async function sign_in(loginData: ILoginUserData): Promise<string> {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const LOGIN_URL = import.meta.env.VITE_FEATURE_LOGIN;

    try{
        if (!BASE_URL || !LOGIN_URL) {
            throw new Error("API base URL or login URL is not defined in the environment variables.");
        }
        const response = await axios.post(`${BASE_URL}${LOGIN_URL}`, loginData,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return response.data;
        } else if(response.status === 400) {
            return "Login failed";
        }
    } catch (error){
        console.error(error);
        return "";
    }
    return "Unexpected error";
}