import { useContext, useEffect, useMemo } from "react";
import {  Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute() {
   const { isUserLogIn } = useContext(AuthContext);

   // Memoize the value to prevent re-renders
   const userLoggedIn = isUserLogIn();

   return userLoggedIn ? <Navigate to="/note" replace /> : <Outlet />;
}