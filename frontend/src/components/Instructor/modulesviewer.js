import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

import Navbar from './navbar';
import useImageUploader from '../../hooks/useImageUploader';
import useFetchGet from '../../hooks/useFetchGet';
import useFetchPost from "../../hooks/useFetchPost";
import "../stylesheets/Instructor/moduleviewer.css"


const Modulesviewer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Pdf, setPdf] = useState(null);

    const [selectedProject, setselectedProject] = useState(null);

    const [getrequest, data, ispending, error] = useFetchGet();
    const [postrequest, moduledata, pending, err] = useFetchPost();
    const [postPdf, Pdfurl, isPending, _err] = useImageUploader();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getrequest(`http://localhost:8081/courses/modules/${id}`)
    }, [])

    var StorePdf = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', Pdf);
        postPdf("http://localhost:8081/upload", formData);
        setPdf(Pdfurl)
    }

    useEffect(() => {
        setPdf(Pdfurl);
    }, [Pdfurl])


    const openModal = (course) => {
        setselectedProject(course);
    };

    const Addmodule = (e) => {
        e.preventDefault();
        const formdata = { title: title, description : description , pdf: Pdfurl }
        postrequest(`http://localhost:8081/courses/addmodule/${id}`, formdata)
        navigate("/mycourses");
        toast.success("Module Added Successfully");
    }


    return (
        <div>
            <Navbar />
            <div className="container">
                <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#moduleModal">Add module</button>
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
                                &nbsp;&nbsp;<button class="btn btn-primary" onClick={() => navigate(`/addquiz/${module._id}`)}>Add Quiz</button>
                                &nbsp;&nbsp;<button class="btn btn-primary" onClick={() => navigate(`/viewquiz/${module._id}`)}>View Quiz</button>
                            </div>
                        </div>
                    </div>
                    
                ))}
            </div>

            {/* ModuleForm Modal */}
            <div className="modal fade" id="moduleModal" tabIndex="-1" role="dialog" aria-labelledby="moduleModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add a new Module</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="course-form-container">
                                <form className="course-form" onSubmit={Addmodule}>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" value={title}
                                        onChange={(e) => setTitle(e.target.value)} required />

                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" name="description" value={description}
                                        onChange={(e) => setDescription(e.target.value)} required />
                                    <label htmlFor="image">Upload Module Content Here</label>
                                    <div id='image-container'>
                                        <input type="file" onChange={(e) => {
                                            setPdf(e.target.files[0])
                                        }} accept="application/pdf" />
                                        <button onClick={StorePdf} id='imageuploadbtn' >Upload Pdf</button>
                                        <br />
                                    </div>
                                    {Pdfurl != null && <button onClick={(e) => {
                                        e.preventDefault();
                                        window.open(`http://localhost:8081/files/${Pdfurl}`, "_blank", "noreferrer");
                                    }} id='imageuploadbtn' >Preview</button>}
                                    {Pdfurl != null && <span>&nbsp;&nbsp;content uploaded Successfully</span>}
                                    <button type="submit" data-bs-dismiss="modal" >Create Module</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modulesviewer;
