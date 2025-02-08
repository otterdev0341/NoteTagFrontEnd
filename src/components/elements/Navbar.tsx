import { NavLink, useNavigate } from 'react-router-dom';
import CustomButton from './Button';
import { ButtonType } from './Button';

import './navbar.css';



export default function Navbar(){

    const navigate = useNavigate();

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
                    <CustomButton button_type={ButtonType.Primary} text="Login" onClick={() => navigate('/login')} />
                    <CustomButton button_type={ButtonType.Primary} text="Logout"  />
                </div>
            </div>
            
        </nav>
    );
}