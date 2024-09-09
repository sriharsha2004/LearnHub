import React from 'react';
import Navbar from './navbar';

import { Link } from 'react-router-dom';

import "../stylesheets/Instructor/home.css"

const InstructorHome = () => {
    return (
        <div>
            <Navbar />
            <div className="instructor-home-container">
                <h1 className="instructor-home-title">Instructor Dashboard</h1>
                <p className="instructor-home-subtitle">
                    As an instructor, you can create and manage courses, upload content, and create quizzes to assess your students' understanding.
                </p>

                <div className="instructor-actions">
                    {/* Create and Manage Courses */}
                    <div className="action-card">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/courseimg.png`} alt="Manage Batches" className="action-card-image" />
                        <h2>Create and Manage Courses</h2>
                        <p>
                            Build your course by adding titles, descriptions, and assigning modules. You can also edit and update existing courses.
                        </p>
                        <Link to="/addcourse" className="action-button">Create or Manage Courses</Link>
                    </div>

                    {/* Module Management */}
                    <div className="action-card">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/module.png`} alt="Manage Batches" className="action-card-image" />
                        <h2>Upload and Manage Course Modules</h2>
                        <p>
                            Add PDF modules to your course to provide students with reading material and additional resources.
                        </p>
                        <Link to="/addedcourses" className="action-button">Upload Modules</Link>
                    </div>

                    {/* Quiz Management */}
                    <div className="action-card">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/quiz.png`} alt="Manage Batches" className="action-card-image" />
                        <h2>Create and Manage Quizzes</h2>
                        <p>
                            Create quizzes to assess students' learning. You can add questions, set correct answers, and manage existing quizzes.
                        </p>
                        <Link to="/addedcourses" className="action-button">Create or Manage Quizzes</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorHome;
