import React from 'react';
import { Link } from 'react-router-dom';

import "./stylesheets/navbar.css"

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">SignIn</Link></li>
                <li><Link to="/register">SignUp</Link></li>
                <li><Link to="/about">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
