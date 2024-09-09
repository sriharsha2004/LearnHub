import React from 'react';
import {Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import {useRole} from "../../RoleContext"


const Navbar = () => {
    
    const navigate = useNavigate();

    const {role,setRole} = useRole();

    var handlelogout = () => {
        localStorage.clear();
        setRole();
        navigate("/");
    }

    return (
        <nav>
            <ul>
                <li><Link to="/StudentHome">Home</Link></li>
                <li><Link to="/courses">Enroll new Course</Link></li>
                <li><Link to="/mycourses">Your courses</Link></li>
                <li><Link to="/myBadges">Your Badges</Link></li>
                <li><Link to="/login" id="logout" onClick={handlelogout}>Logout</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
