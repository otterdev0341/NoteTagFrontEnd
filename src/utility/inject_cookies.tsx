import Cookies from 'js-cookie';


export function injectUserToken(){
    const user_token: string = Cookies.get("token") || localStorage.getItem("token") || "";    
    if(user_token === ""){
        alert("Token not found, redirect to login page");
        localStorage.removeItem("token");
        Cookies.remove("token");        
        window.location.href = "/login";
        return "";
    }
    return user_token;
}