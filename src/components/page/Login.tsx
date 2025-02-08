import { useNavigate } from "react-router-dom";
import "./login.css";


export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="section" >
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="form-section">
                    <form action="" method="post">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" />
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