import { NavLink, useNavigate } from 'react-router-dom';
import CustomButton from './Button';
import { ButtonType } from './Button';

import './navbar.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

import { injectUserToken } from '../../utility/inject_cookies';
import { AuthService } from '../../services/auth';


export default function Navbar(){

    const navigate = useNavigate();
    const {isUserLogIn, setEmpty} = useContext(AuthContext);

    const user_status = isUserLogIn();
    const [username, setUsername] = useState<string>("");
    useEffect(() => {
        fetchUsername();
    }, [user_status]);
    function logout(){
        Cookies.remove('token');
        localStorage.removeItem('token');
        setEmpty();
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        
    }

    async function fetchUsername(){
        if(user_status){
           const user_token = injectUserToken();
           try {
            const auth_service = new AuthService();
            const user = await auth_service.me(user_token); 
            console.log(user);
            if (user.ok) {
                setUsername(user.value);
            } else {
                setUsername("");
            }
           } catch (error) {
            console.log(error);
           }
        } else {
            setUsername("");
        }
    }

    return(
        <nav className="navbar">
            <div className='logo'>
                <span onClick={() => navigate("/note")}>Note List</span>
            </div>
            <div id='menu'>
                <div>
                    <ul>
                        <li>
                            {
                                user_status ? (
                                    <>
                                    <span style={{marginRight: "10px"}}>{username}</span>
                                    <NavLink to={'/note'}  >Notes</NavLink >
                                    </>
                                ) : (
                                    <NavLink to={'/'}  >Home</NavLink >
                                )
                            }       
                            
                        </li>
                        {
                            user_status ? (
                        <>
                        <li>
                            <NavLink to={'/search'}>Search</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/tags'}>Tags</NavLink>
                        </li>
                        </>
                            ) : null
                        }
                        
                    </ul>
                </div>
                
                <div className="user">
                    { user_status ? (
                        <CustomButton button_type={ButtonType.Warning} text="Logout" onClick={logout} />
                    ) : (
                        <>
                            <CustomButton button_type={ButtonType.Primary} text="Register" onClick={() => navigate('/register')} />
                            <CustomButton button_type={ButtonType.Primary} text="Login" onClick={() => navigate('/login')} />
                        </>
                    )}
                </div>
            </div>
            
        </nav>
    );
}