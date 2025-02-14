import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
    
    const {token} = useContext(AuthContext);
    

    // if not logged in, redirect to login page\
    // if logged in, render the outlet

    

    return token ? <Outlet /> : <Navigate to="/login" />;
}