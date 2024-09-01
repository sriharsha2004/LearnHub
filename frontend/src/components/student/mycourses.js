import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './navbar';
import useFetchGet from '../../hooks/useFetchGet';

const Mycourses = () => {

    const [getrequest,data,ispending,error] = useFetchGet();

    const navigate = useNavigate();

    useEffect(() => {
        getrequest("http://localhost:8081/courses/getenrolledcourses");
    },[])

    return (
        <div>
            <Navbar/>
            {data!==null && data.length == 0 && <div>No courses Found</div>}
            <div className="student-home-container">
            {!ispending && !error && (
                <div className="course-container">
                {data!==null && data.map(course => (
                    <div key={course._id} className="course-item">
                        <div className="course-image">
                            <img src={`http://localhost:8081/files/${course.courseimage}`} alt="Project Image" />
                        </div>
                        <div className="course-details">
                            <h2><strong>Course Name :</strong> {course.title}</h2>
                            <p><strong>Course Description:</strong> {course.description}</p>
                            <button onClick={() => navigate(`/coursemodules/${course._id}`)} id='viewer' >View modules</button>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default Mycourses;
