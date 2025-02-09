import { createContext, useState } from "react";
import { IAuthContext } from "../domain/AuthDto";


export const AuthContext = createContext<IAuthContext>({
    token: "",
    setToken: () => {},
    setEmpty: () => {},
});

