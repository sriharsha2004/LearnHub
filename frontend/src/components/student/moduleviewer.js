import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from './navbar';
import useFetchGet from '../../hooks/useFetchGet';
import "../stylesheets/Instructor/moduleviewer.css"

const Moduleviewer = () => {

    const [getrequest, data, ispending, error] = useFetchGet();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getrequest(`http://localhost:8081/courses/modules/${id}`)
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="container">
                {data !== null && data.length === 0 && <div>No modules Found</div>}
                {data !== null && data.map((module) => (
                    <div class="accordion" id="accordionExample" key={module._id}>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#exampleModule-${module._id}`} aria-expanded="true" aria-controls={`#exampleModule-${module._id}`}>
                                    {module.title}
                                </button>
                            </h2>
                            <div id={`exampleModule-${module._id}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>Description : </strong> {module.description}
                                </div>
                                <button class="btn btn-primary" onClick={() => window.open(`http://localhost:8081/files/${module.pdf}`, "_blank", "noreferrer")}>View Content</button>
                                &nbsp;&nbsp;<button class="btn btn-primary" onClick={()=>navigate(`/Attemptquiz/${module._id}`)}>Attempt Quiz</button>
                            </div>
                        </div>
                    </div>
                    
                ))}
                </div>
        </div>
    );
}

export default Moduleviewer;
