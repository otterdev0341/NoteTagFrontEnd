import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {

    // const net to check auth
    const token = false;

    return token ? <Navigate to="/about" /> : <Outlet />;
}