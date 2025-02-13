import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Landing from "../components/page/Landing";
import NotFound from "../components/page/NotFound";
import Home from "../components/page/Home";
import Register from "../components/page/Register";
import Login from "../components/page/Login";
import Search from "../components/page/Search";
import TagManagement from "../components/page/TagManagement";

export default function RouteRegister() {
    
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                {/* Register public route here */}
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>
            
            <Route element={<ProtectedRoute />}>
                {/* protected routes defined here */}
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/tags" element={<TagManagement />} />
            </Route>
        </Routes>
    );
}