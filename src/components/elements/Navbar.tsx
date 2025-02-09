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
    const {token, setEmpty} = useContext(AuthContext);


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
                <span onClick={() => navigate("/")}>Note List</span>
            </div>
            <div id='menu'>
                <div>
                    <ul>
                        <li>       
                            <NavLink to={'/'}  >Home</NavLink >
                        </li>
                        <li>
                            <NavLink to={'/search'}>Search</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/tags'}>Tags</NavLink>
                        </li>
                    </ul>
                </div>
                
                <div className="user">
                    <CustomButton button_type={ButtonType.Primary} text="Register" onClick={() => navigate('/register')} />
                    {
                        token && token.length > 0 ?
                        <CustomButton button_type={ButtonType.Primary} text="Logout" onClick={logout} />
                        :
                        <CustomButton button_type={ButtonType.Primary} text="Login" onClick={() => navigate('/login')} />
                    }
                    
                </div>
            </div>
            
        </nav>
    );
}