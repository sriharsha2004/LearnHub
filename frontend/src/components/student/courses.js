import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchGet from '../../hooks/useFetchGet';
import Navbar from './navbar';
import "../stylesheets/student/courses.css"

const Courses = () => {

    const [getrequest, data, isPending, error] = useFetchGet();
    const [selectedcourse, setselectedcourse] = useState(null);

    // const [data,setdata] = useState(d);

    const navigate = useNavigate();

    useEffect(() => {
        getrequest(`${process.env.REACT_APP_BACKEND_URL}/courses/all`)
        console.log(data);
    }, [])

    // var handlePostIdea = (project) => {
    //     navigate(`/post/${project._id}` , { state : {formData : project} })
    // }

    const openModal = (course) => {
        setselectedcourse(course);
    };

    const enrollcourse = (id) => {
        getrequest(`${process.env.REACT_APP_BACKEND_URL}/courses/enroll/${id}`)
        navigate("/mycourses");
    }

    return (
        <div>
            <Navbar />
            {data !== null && data.length == 0 && <div>No courses Found</div>}
            <div className="student-home-container">
                {!isPending && !error && (
                    <div className="course-container">
                        {data !== null && data.map(course => (
                            <div key={course._id} className="course-item">
                                <div className="course-image">
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/files/${course.courseimage}`} alt="Project Image" />
                                </div>
                                <div className="course-details">
                                    <h2><strong>Course Name :</strong> {course.title}</h2>
                                    <p><strong>Course Description:</strong> {course.description}</p>
                                    <button onClick={() => openModal(course)} data-bs-toggle="modal" data-bs-target={`#exampleModal-${course._id}`} id='viewer'>View Details</button>
                                    {/* <button data-bs-toggle="modal"  data-bs-target={`#enrollcourse-${course._id}`} >Enroll for Free <span id='cost'>9$</span></button> */}
                                    <button data-bs-toggle="modal"  data-bs-target={`#enrollcourse-${course._id}`} >{course.price == 0 ? <div>Enroll For Free</div> : <div> &#8377;{course.price}</div>}</button>
                                </div>

                                {/* enroll model */}
                                <div class="modal" id={`enrollcourse-${course._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Do you want to enroll for the <strong>{course.title}</strong> course ?? 
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick = {() => enrollcourse(course._id)}>Enroll Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* modal */}
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
                                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/files/${course.courseimage}`} alt="Project Image" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="modal-info">
                                                            <p><strong>Description:</strong> {course.description}</p>
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
            {error && <p className="error-message">Error Occurred</p>}
            {isPending && <p className="pending-message">Failed to Fetch courses...</p>}
        </div>
    );
}

export default Courses;
