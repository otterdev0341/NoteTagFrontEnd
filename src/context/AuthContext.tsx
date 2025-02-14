import { createContext, useState } from "react";
import { IAuthContext } from "./schemas/auth_schema";



export const AuthContext = createContext<IAuthContext>({
    token: "",
    setToken: () => {},
    setEmpty: () => {},
    isUserLogIn: () => true || false,
    performLogin: () => {}
    
});

