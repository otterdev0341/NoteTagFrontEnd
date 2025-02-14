import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Landing from "../components/page/Landing";
import NotFound from "../components/page/NotFound";
import Register from "../components/page/Register";
import Login from "../components/page/Login";
import Search from "../components/page/Search";
import TagManagement from "../components/page/TagManagement";
import NoteList from "../components/page/NoteList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RouteRegister() {
    
    const {isUserLogIn} = useContext(AuthContext);
    const user_status = isUserLogIn();

    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                {/* Register public route here */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/register" element={<Register />} />
                
            </Route>
            
            <Route element={<ProtectedRoute />}>
                {/* protected routes defined here */}
                <Route path="/note" element={<NoteList />} />
                <Route path="/search" element={<Search />} />
                <Route path="/tags" element={<TagManagement />} />
            </Route>
        </Routes>
    );
}