import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    
    const token = true;

    // if not logged in, redirect to login page\
    // if logged in, render the outlet

    

    return token ? <Outlet /> : <Navigate to="/login" />;
}