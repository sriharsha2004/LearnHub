import React from 'react';
import Navbar from './navbar';
import { useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRole } from '../RoleContext';
import "./stylesheets/home.css"

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
            <div className="home-container">
            <div className="home-text">
                <h1>
                From <span className="highlight">Learning</span> to <span className="highlight">Earning</span>:
                Transform into a Skilled Developer
                </h1>
                <p>
                Enroll in our courses to secure your dream job in tech.
                </p>
                <div className="home-buttons">
                <button className="btn-download" onClick={()=>navigate("/login")}>Enroll Now!!!</button>
                {/* <button className="btn-contact">Contact us</button> */}
                </div>
            </div>
            <div className="home-image">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/files/home.png`} alt="Team Collaboration" />
            </div>
            </div>
            <div className="career-paths-container">
                <h2>Two Career Paths, One Goal: Your Success</h2>
                <div className="career-paths-grid">
                    <div className="career-card">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/codeimage.png`} alt="Development Path Icon" />
                    <h3>Development Path: For Students</h3>
                    <p>
                        Develop and enhance your skills by enrolling to our courses.
                    </p>
                    <button className="btn-explore" onClick={()=>navigate("/login")}>Explore the Courses</button>
                    </div>
                    <div className="career-card">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/instructor.png`} alt="Testing Path Icon" />
                    <h3>Ready to share your knowledge and help others learn!</h3>
                    <p>Use your expertise and provide valuable insights and guide Students through new concepts and skills.</p>
                    <button className="btn-explore" onClick={()=>navigate("/login")}>Add courses</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
