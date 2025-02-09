import { useNavigate } from "react-router-dom";
import "./login.css";
import { ILoginUserData } from "../../domain/AuthDto";
import { useContext, useState } from "react";
import Cookies from 'js-cookie';
import { isValidEmail, isValidPassword } from "../../utility/validateData";
import { api_login } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";



export default function Login() {
    const auth_context = useContext(AuthContext);
    const initialLoginData : ILoginUserData = {
        email: "",
        password: "",
    }

    const [loginData, setLoginData] = useState({...initialLoginData});
    const [errors, setErrors] = useState<ILoginUserData>({ ...initialLoginData });
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    function onLoginDataChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setTouched((prev) => ({
            ...prev,
            [name]: true, // Mark field as touched
          }));
        validateLoginData({ ...loginData, [name]: value });
    }

    function validateLoginData(checkData: ILoginUserData): boolean {
        const { email, password } = checkData;
        const newErrors: ILoginUserData = { ...initialLoginData };
        let isvalid = true;
        if (!isValidEmail(email)) {
            newErrors.email = "Invalid email format";
            isvalid = false;
        }
        if (!isValidPassword(password)) {
            newErrors.password = "Password must be 8-15 char long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.";
            isvalid = false;
        }
        setErrors(newErrors);
        return isvalid;
    }

    async function onLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validateLoginData(loginData)) {
            // already got token from api_login
            const token = await api_login(loginData);
            // persist to cookies
            // if already exist in cookies, it will be updated
            // 1 / 48 of a day is 30 minutes
            Cookies.set("token", token, { expires: 1 / 48 });
        }
    }

    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="section" >
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="form-section">
                    <form onSubmit={onLoginSubmit} method="post">
                        <div className="form-group">
                            {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" autoComplete="off" value={loginData.email} onChange={onLoginDataChange} />
                        </div>
                        <div className="form-group">
                            {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={loginData.password} onChange={onLoginDataChange} />
                        </div>
                        <div className="button-section">
                            <button id="submit" type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className="form-footer">
                    <p>Don't have an account? <a id="a-login" onClick={() => navigate("/register")}>Register</a></p>
                </div>
            </div>
        </div>
    )
}