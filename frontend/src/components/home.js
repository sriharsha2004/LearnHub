import React from 'react';
import Navbar from './navbar';
import { useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRole } from '../RoleContext';

const Home = () => {

    const { role , setRole } = useRole();

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(role);
        if(role === "Student") navigate("/StudentHome");
        if(role === "Instructor") navigate("/InstructorHome");
    }, [role]);

    return (
        <div>
            <Navbar/>
            This is home componenet
        </div>
    );
}

export default Home;
