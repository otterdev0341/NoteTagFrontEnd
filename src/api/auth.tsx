import axios from "axios";
import { IRegisterUserData } from "../domain/Register";



export default async function api_register(registerData: IRegisterUserData): Promise<String> {

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const REGISTER_URL = import.meta.env.VITE_FEATURE_REGISTER;

    try{
        
        if (!BASE_URL || !REGISTER_URL) {
            throw new Error("API base URL or register URL is not defined in the environment variables.");
            return "Error: API base URL or register URL is not defined in the environment variables.";
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
        } else {
            
            const responseData = response.data;
            throw new Error(responseData.message);
        }
    } catch (error){
        console.log("Error registering user:", error);
        throw error;
        
    }
}