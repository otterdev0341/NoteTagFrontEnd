import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

    // const net to check auth
    const token = true;

    return token ? <Outlet /> : <Navigate to="/login" />;
}