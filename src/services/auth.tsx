
import { ILoginUserData, IRegisterUserData, IResSignUp } from "../domain/AuthDto";
import { Result, ResultUtils } from "../types/Result";


export enum AuthError {
    InvalidCredentials = "Invalid credentials",
    UserAlreadyExists = "User already exists",
    ServerError = "Server error",
    UnknownError = "Unknown error",
}

export class AuthService{
    
    private base_url: string;
    private feature_sign_up: string;
    private feature_sign_in: string;
    private feature_me: string;
    
    constructor() {
        this.base_url = import.meta.env.VITE_API_BASE_URL;
        this.feature_sign_up = import.meta.env.VITE_FEATURE_SIGN_UP;
        this.feature_sign_in = import.meta.env.VITE_FEATURE_SIGN_IN;
        this.feature_me = import.meta.env.VITE_FEATURE_ME;
    }

    async sign_up(registerData: IRegisterUserData): Promise<Result<IResSignUp,string>> {
        try {
            const response = await fetch(`${this.base_url}${this.feature_sign_up}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });
            if (!response.ok) {
                return ResultUtils.Err(AuthError.ServerError);
            }
            const result: IResSignUp = { msg: "User registered successfully" };
            return ResultUtils.Ok(result);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err(AuthError.UnknownError);
        } 
    }

    async sign_in(loginData: ILoginUserData): Promise<Result<string,AuthError>> {
        try {
            const response = await fetch(`${this.base_url}${this.feature_sign_in}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
            if (!response.ok) {
                return ResultUtils.Err(AuthError.InvalidCredentials);
            }
            const data = await response.text();
            return ResultUtils.Ok(data as string);
        } catch (error) {
            console.error(error);
            return ResultUtils.Err(AuthError.UnknownError);
        }
    }

    // also can use to check is token valid
    async me(token: string)
        : Promise<Result<string,AuthError>> 
    {
        try {
                const response = await fetch(`${this.base_url}${this.feature_me}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    return ResultUtils.Err(AuthError.InvalidCredentials);
                }
                const data = await response.text();
                return ResultUtils.Ok(data);
            } catch (error) {
                console.error(error);
                return ResultUtils.Err(AuthError.UnknownError);
            }
    }
}
