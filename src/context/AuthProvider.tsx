import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    
    

    const setEmpty = () => setToken("");
    
    return (
        <AuthContext.Provider value={{ token, setToken, setEmpty }}>
        {children}
        </AuthContext.Provider>
    );
    };