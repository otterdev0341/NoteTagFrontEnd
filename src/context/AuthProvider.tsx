import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthService } from "../services/auth";
import { ILoginUserData } from "../domain/AuthDto";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    
    const auth_service = new AuthService();
    const navigate = useNavigate();

    const isUserLogIn = () => {
        // real
        // const result = token !== "" && token.length > 0;
        // mock from cookie
        const result = Cookies.get("token") !== "" && Cookies.get("token") !== undefined;
        return result;
        
    };

    function performLogin(data: ILoginUserData) {
        auth_service.sign_in(data)
            .then((result) => {
            if (result.ok) {
                setToken(result.value);
                // persist to cookies
                // if already exist in cookies, it will be updated
                // 1 / 48 of a day is 30 minutes
                Cookies.set("token", result.value, { expires: 1 / 48 });
                // delay 1 second
                setTimeout(() => {
                    navigate('/note');
                }, 1000);
                
            } else {
                console.log(result.error);
            }
        });
    }

    const setEmpty = () => setToken("");

  
    
    return (
        <AuthContext.Provider value={{ performLogin, token, setToken, setEmpty, isUserLogIn }}>
            {children}
        </AuthContext.Provider>
    );
    };