import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthService } from "../services/auth";
import { ILoginUserData } from "../domain/AuthDto";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [token, setToken] = useState<string>("");
    // load all note on login pass
    
    
    const navigate = useNavigate();

    useEffect(() => {
         // Initialize token from cookies or localStorage on mount
         const cookieToken = Cookies.get("token");
         const localStorageToken = localStorage.getItem("token");
         if (cookieToken) {
             setToken(cookieToken);
         } else if (localStorageToken) {
             setToken(localStorageToken);
         }
    }, []);

    const isUserLogIn = () => {
        // real
        // const result = token !== "" && token.length > 0;
        // mock from cookie
        ;
        return token !== "" && token.length > 0;
        
    };
    
    const setEmpty = () => setToken("");
    
    async function performLogin(data: ILoginUserData) {
        const auth_service = new AuthService();
        const result = await auth_service.sign_in(data);
        
        if (result.ok) {
            // Set token in the context
            setToken(result.value);
            // Set token in the cookies
            Cookies.set("token", result.value, { expires: 1 /48 });
            // save to local storage
            localStorage.setItem("token", result.value);
            // navigate to the home page
            navigate("/note");
            
        }
            
                
         
    }

    

  
    
    return (
        <AuthContext.Provider value={{ performLogin, token, setToken, setEmpty, isUserLogIn }}>
            {children}
        </AuthContext.Provider>
    );
    };