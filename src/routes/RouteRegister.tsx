import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

export default function RouteRegister() {
    
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                
            </Route>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                
            </Route>
        </Routes>
    );
}