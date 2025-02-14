import { NavLink, useNavigate } from 'react-router-dom';
import CustomButton from './Button';
import { ButtonType } from './Button';

import './navbar.css';
import { use, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { log } from 'console';


export default function Navbar(){

    const navigate = useNavigate();
    const {isUserLogIn, setEmpty} = useContext(AuthContext);

    const user_status = isUserLogIn();

    function logout(){
        Cookies.remove('token');
        // Cookies.set('token', '');
        setEmpty();
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        
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
                                    <NavLink to={'/note'}  >Notes</NavLink >
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
                        <CustomButton button_type={ButtonType.Primary} text="Logout" onClick={logout} />
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