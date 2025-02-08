
import { Routes, Route } from "react-router-dom";
import Main from "./components/page/Main";
import Register from "./components/page/Register";
import Login from "./components/page/Login";
import Navbar from "./components/elements/Navbar";
import Search from "./components/page/Search";
import Tags from "./components/page/Tags";
import NotFound from "./components/page/NotFound";

export default function App(){
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}