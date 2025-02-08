
import { Routes, Route } from "react-router-dom";
import Main from "./components/page/Main";
import Register from "./components/page/Register";
import Login from "./components/page/Login";

export default function App(){
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}