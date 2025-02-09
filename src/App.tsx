
import { Routes, Route } from "react-router-dom";
import Main from "./components/page/Main";
import Register from "./components/page/Register";
import Login from "./components/page/Login";
import Navbar from "./components/elements/Navbar";
import Search from "./components/page/Search";
import Tags from "./components/page/Tags";
import NotFound from "./components/page/NotFound";
import { AuthContext } from "./context/AuthContext";
import { IAuthContext } from "./domain/AuthDto";
import Cookies from "js-cookie";


export default function App(){
  
  const user_token = Cookies.get("token");
  
  const initial_value: IAuthContext = {
    token: user_token ? user_token : "",
  };

  return (
    <div>
      <Navbar />
      <AuthContext.Provider value={initial_value}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}