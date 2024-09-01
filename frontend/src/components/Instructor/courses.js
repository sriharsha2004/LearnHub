import React, { useEffect , useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"

import useFetchGet from '../../hooks/useFetchGet';

import "../stylesheets/student/courses.css"

const Courses = () => {
    const [selectedProject, setselectedProject] = useState(null);
    const [deleted,setdeleted] = useState(false);

    const navigate = useNavigate();

    const [getrequest,data,ispending,error] = useFetchGet();

    useEffect(()=>{
        getrequest("http://localhost:8081/courses/getinstructorcourses")
    },[deleted])


    const openModal = (course) => {
        setselectedProject(course);
    };

    const deletecourse = (id) => {
        axios.delete(`http://localhost:8081/courses/delete/${id}`).then((res)=>{
            setdeleted(true);
            if(res.data === "Failed") toast.error("Failed to delete course")
            else toast.success("Course Deleted Successfully");
            // console.log(res.data);  
        })
        .catch((err)=>{
            console.log(err);            
        })
    }

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
                            <h2 id='course-head'><strong>Course Name :</strong> {course.title}</h2>
                            <p><strong>Course Description:</strong> {course.description}</p>
                            {/* <button onClick={() => openModal(course)} data-bs-toggle="modal" data-bs-target={`#moduleModal-${course._id}`}>View modules</button> */}
                            <button onClick={() => navigate(`/modules/${course._id}`)} >View modules</button>
                            <button onClick={() => openModal(course)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${course._id}`} id='viewer'>View Details</button>
                        </div>

                        {/* view modal */}
                    <div className="modal fade" id={`exampleModal-${course._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${course._id}`} aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{course.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="modal-image">
                                                <img src={`http://localhost:8081/files/${course.courseimage}`} alt="Project Image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="modal-info">
                                                <p><strong>Description:</strong> {course.description}</p>
                                                <button type="button" className="btn btn-success">{course.price == 0 ? <div>Free Course</div> : <div> &#8377;{course.price}</div>}</button>
                                                &nbsp;&nbsp;<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { deletecourse(course._id)}}>Delete Course</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
            {data==null && <div>No courses Uploaded</div>}
            {error && <p className="error-message">Error Occurred</p>}
            {ispending && <p className="pending-message">Failed to Fetch courses...</p>}
        </div>
    );
}

export default Courses;
