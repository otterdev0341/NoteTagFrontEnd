import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { IRegisterUserData } from "../../domain/AuthDto";
import { isFirsttNameLastName, isGenderValid, isValidEmail, isValidPassword, isValidUsername } from "../../utility/validateData";
import { AuthService } from "../../services/auth";
import { ResultUtils } from "../../types/Result";



export default function Register() {
  const navigate = useNavigate();
  const genderList = ["male", "female"];

  const initialUserData: IRegisterUserData = {
    username: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
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
    const { username, password, first_name, last_name, gender, email } = checkData;
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
    if (!isFirsttNameLastName(first_name)) {
      newErrors.first_name = "Firstname must be 2-15 char long, only letters.";
      isvalid = false;
    }
    if (!isFirsttNameLastName(last_name)) {
      newErrors.last_name = "Lastname must be 2-15 char long, only letters.";
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
    
    const validateResult = validateRegisterData(registerData);
    if (!validateResult) {
      return
    } else {
      const auth_service = new AuthService();
      const result = await auth_service.sign_up(registerData);
      const registerResult = document.getElementById("register-result");
      if (registerResult) {

      const operationResult = ResultUtils.match(result, (data) => {
        return data.msg;
      }, (error) => {
        return error;
      });
      
        

        if (operationResult === "User registered successfully") {
          registerResult.classList.add("green");
          registerResult.style.display = "block";
          registerResult.innerHTML = operationResult as string;
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        registerResult.classList.remove("green");
        registerResult.classList.add("red");
        registerResult.style.display = "block";
        registerResult.innerHTML = `Registration failed, is email alrady exist, or dupicate username`; 
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
              {touched.firstname && errors.first_name && <div className="error-message">{errors.first_name}</div>}
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="first_name"
                id="firstname"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.first_name}
              />
            </div>

            {/** Last Name Field */}
            <div className="form-group">
              {touched.lastname && errors.last_name && <div className="error-message">{errors.last_name}</div>}
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="lastname"
                autoComplete="off"
                required
                onChange={onRegisterDataChange}
                value={registerData.last_name}
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
