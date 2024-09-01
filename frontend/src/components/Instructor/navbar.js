import React from 'react';
import { Link } from 'react-router-dom';

import "../stylesheets/navbar.css"

const Navbar = () => {

    var handlelogout = () => {
        localStorage.clear();
    }

    return (
        <nav>
            <ul>
                <li><Link to="/InstructorHome">Home</Link></li>
                <li><Link to="/addedcourses">Your courses</Link></li>
                <li><Link to="/addcourse">Add new courses</Link></li>
                 <li><Link to="/login" id="logout" onClick={handlelogout}>Logout</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
