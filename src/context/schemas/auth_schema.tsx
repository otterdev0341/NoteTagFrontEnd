import { ILoginUserData } from "../../domain/AuthDto";


export interface IAuthContext {
    token: string;
    setToken: (token: string) => void;
    setEmpty: () => void;
    isUserLogIn: () => boolean;
    performLogin: (data: ILoginUserData) => void;
    
}


