import { createContext } from "react";
import { IAuthContext } from "../domain/AuthDto";

export const AuthContext = createContext<IAuthContext>({
    token: "",
});