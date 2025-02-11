
import { Routes, Route } from "react-router-dom";
import Main from "./components/page/Home";
import Register from "./components/page/Register";
import Login from "./components/page/Login";
import Navbar from "./components/elements/Navbar";
import Search from "./components/page/Search";
import Tags from "./components/page/Tags";
import NotFound from "./components/page/NotFound";

import { IAuthContext } from "./domain/AuthDto";
import Cookies from "js-cookie";
import { useState } from "react";
import Home from "./components/page/Home";


export default function App(){

  

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}