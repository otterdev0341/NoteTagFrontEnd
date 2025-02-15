import Cookies from 'js-cookie';

export function injectUserToken(){
    const user_token = Cookies.get("token") || localStorage.getItem("token") || "";    
    return user_token;
}