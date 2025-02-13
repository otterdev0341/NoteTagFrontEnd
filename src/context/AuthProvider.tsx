import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    
    const isTokenExist = () => {
        const result = token !== "" && token.length > 0;
        return result;
        
    };

    const setEmpty = () => setToken("");
    
    return (
        <AuthContext.Provider value={{ token, setToken, setEmpty, isTokenExist }}>
            {children}
        </AuthContext.Provider>
    );
    };