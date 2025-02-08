import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { IRegisterUserData } from "../../domain/Register";



export default function Register() {
  
  const navigate = useNavigate();
  const gender = ["Male", "Female"];

  const userData: IRegisterUserData = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
  };

  const [registerData, setResgisterData] = useState(userData);
  function onRegisterDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setResgisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateRegisterData(registerData);
  }

  function validateRegisterData(checkData: IRegisterUserData): boolean {
    const { username, password, firstname, lastname, gender, email } = checkData;
    const usernameErrorDisplay = document.getElementById("username-error");
    
    if (username.length < 8) {
      if (usernameErrorDisplay) {
        usernameErrorDisplay.textContent = "Username must be at least 8 characters long";
      } 
      return false;
    } else {
      if (usernameErrorDisplay) {
        usernameErrorDisplay.textContent = "";
      }
    }
    return true;
  }


  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(registerData);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    navigate("/login");

  }


  return (
    <div className="container">
        <div className="section">
          
        
        <div className="header">
            <h1>Register</h1>
        </div>
        <div className="form-section">
          
          <form onSubmit={handleRegister} method="post">
            <div className="form-group">
              <div className="error-message">
                <span id="username-error">error</span>
              </div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username"  autoComplete="off" required onChange={onRegisterDataChange} value={registerData.username} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" autoComplete="off" required onChange={onRegisterDataChange} value={registerData.password} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" autoComplete="off" required onChange={onRegisterDataChange} value={registerData.email} />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input type="text" name="firstname" id="firstname" autoComplete="off" required onChange={onRegisterDataChange} value={registerData.firstname} />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name="lastname" id="lastname" autoComplete="off" required onChange={onRegisterDataChange} value={registerData.lastname} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select name="gender" className="gender" required onChange={onRegisterDataChange}>
                <option value="" disabled>Select Gender</option>
                  {gender.map((gender,index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-section">
                <button id="submit" type="submit">Register</button>
            </div>
          </form>
        </div>
        <div className="form-footer">
            <p>Already have an account? <a onClick={() => navigate("/login")} id="a-login" href="/login">Login</a></p>
        </div>
        </div>
    </div>
  )
}