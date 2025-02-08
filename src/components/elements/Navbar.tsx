import CustomButton from './Button';
import { ButtonType } from './Button';

import './navbar.css';



export default function Navbar(){



    return(
        <nav className="navbar">
            <div className='logo'>
                <span>Note List</span>
            </div>
            <div id='menu'>
                <div>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Search</a></li>
                        <li><a href="#">Tags</a></li>
                    </ul>
                </div>
                
                <div className="user">
                    <CustomButton button_type={ButtonType.Primary} text="Register" />
                    <CustomButton button_type={ButtonType.Primary} text="Login" />
                    <CustomButton button_type={ButtonType.Primary} text="Logout" />
                </div>
            </div>
            
        </nav>
    );
}