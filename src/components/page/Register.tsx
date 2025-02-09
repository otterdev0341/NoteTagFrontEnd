import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { IRegisterUserData } from "../../domain/Register";
import { isFirsttNameLastName, isGenderValid, isValidEmail, isValidPassword, isValidUsername } from "../../utility/validateData";

import api_register from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const genderList = ["male", "female"];

  const initialUserData: IRegisterUserData = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
  };

  const [registerData, setRegisterData] = useState(initialUserData);
  const [errors, setErrors] = useState<IRegisterUserData>({ ...initialUserData });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  function onRegisterDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true, // Mark field as touched
    }));

    validateRegisterData({ ...registerData, [name]: value });
  }

  function validateRegisterData(checkData: IRegisterUserData): boolean {
    const { username, password, firstname, lastname, gender, email } = checkData;
    const newErrors: IRegisterUserData = { ...initialUserData };
    let isvalid = true;
    if (!isValidUsername(username)){
       newErrors.username = " Username must be 8-15 char long, start with only a letter, allow numbers, underscores, or dashes.";
       isvalid = false;
    }
    if (!isValidPassword(password)) {
      newErrors.password = "Password must be 8-15 char long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.";
      isvalid = false;
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Invalid email";
      isvalid = false;
    }
    if (!isFirsttNameLastName(firstname)) {
      newErrors.firstname = "Firstname must be 2-15 char long, only letters.";
      isvalid = false;
    }
    if (!isFirsttNameLastName(lastname)) {
      newErrors.lastname = "Lastname must be 2-15 char long, only letters.";
      isvalid = false;
    }
    if (!isGenderValid(gender, genderList)) {
      newErrors.gender = "Please select a valid gender";
      isvalid = false;
    }
    setErrors(newErrors);
    return isvalid;
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(registerData);
    const validateResult = validateRegisterData(registerData);
    if (!validateResult) {
      return
    } else {
      const result = await api_register(registerData);
      const registerResult = document.getElementById("register-result");
      if (registerResult) {
        if (result === "user registered successfully") {
          registerResult.classList.add("green");
          registerResult.style.display = "block";
          registerResult.innerHTML = result as string;
        } else {
          registerResult.classList.remove("green");
          registerResult.innerHTML = `Registration failed: ${result}`; ;
          
        }
      }
    }
    // cal register api
    
    // navigate("/login");
  }

  return (
    <div className="container">
      <div className="section">
        <div className="header">
          <h1>Register</h1>
          <div>
            <span id="register-result">
              Registration Result
            </span>
          </div>
        </div>
        <div className="form-section">
          <form onSubmit={handleRegister} method="post">
            {/** Username Field */}
            <div className="form-group">
              {touched.username && errors.username && <div className="error-message">{errors.username}</div>}
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.username}
              />
            </div>

            {/** Password Field */}
            <div className="form-group">
              {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.password}
              />
            </div>

            {/** Email Field */}
            <div className="form-group">
              {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.email}
              />
            </div>

            {/** First Name Field */}
            <div className="form-group">
              {touched.firstname && errors.firstname && <div className="error-message">{errors.firstname}</div>}
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.firstname}
              />
            </div>

            {/** Last Name Field */}
            <div className="form-group">
              {touched.lastname && errors.lastname && <div className="error-message">{errors.lastname}</div>}
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.lastname}
              />
            </div>

            {/** Gender Field */}
            <div className="form-group">
              {touched.gender && errors.gender && <div className="error-message">{errors.gender}</div>}
              <label htmlFor="gender">Gender</label>
              <select name="gender" className="gender" required onChange={onRegisterDataChange}>
                <option value="" >Select Gender</option>
                {genderList.map((gender, index) => (
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
          <p>
            Already have an account? <a onClick={() => navigate("/login")} id="a-login" href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
