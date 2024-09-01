import React from 'react';
import Navbar from './navbar';
import "./stylesheets/Notfound.css"

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Notfound = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" onClick={navigate(-1)} className='home-link'>Go Back</Link>
            </div>
        </div>
    );
}

export default Notfound;
