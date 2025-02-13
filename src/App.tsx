
import { Routes, Route } from "react-router-dom";
import Main from "./components/page/Home";
import Register from "./components/page/Register";
import Login from "./components/page/Login";
import Navbar from "./components/elements/Navbar";
import Search from "./components/page/Search";
import Tags from "./components/page/TagManagement";
import NotFound from "./components/page/NotFound";

import { IAuthContext } from "./domain/AuthDto";
import Cookies from "js-cookie";
import { useState } from "react";
import Home from "./components/page/Home";
import TagManagement from "./components/page/TagManagement";
import Landing from "./components/page/Landing";


export default function App(){

  

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<TagManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}