import React from 'react';
import { useState , useEffect } from 'react';

import useImageUploader from '../../hooks/useImageUploader';
import useFetchPost from "../../hooks/useFetchPost";
import Navbar from './navbar';
import "../stylesheets/Instructor/newcourse.css"

const Newcourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [InstructorId, setInstructorId] = useState('');
    const [image, setImage] = useState(null);
    const [price,setprice] = useState(0);

    const [showimage,setshowimage] = useState();

    const [postImage,imgurl,isPending,error] = useImageUploader();
    const [postrequest,data,ispen,err] = useFetchPost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newcourse = { title : title
        ,courseimage : image, price : price , description : description}

       postrequest(`${process.env.REACT_APP_BACKEND_URL}/courses/new`,newcourse);
  };

  const StoreImage = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    postImage(`${process.env.REACT_APP_BACKEND_URL}/imageupload` , formData);
    setImage(imgurl)
    // console.log(imgurl);
  }

  useEffect(() => {
    setImage(imgurl);
} , [imgurl])

  return (
    <div>
        <Navbar/>
        <div className="course-form-container">
        <form className="course-form" onSubmit={handleSubmit}>
            <h2>Create a Course</h2>

            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)}  required  />

            <label htmlFor="description">Description</label>
            <textarea id="description"  name="description"  value={description} 
                onChange={(e) => setDescription(e.target.value)} required />

            <label htmlFor="price">Price Of Course</label>
            <input type='number' id="price"  name="price"  value={price} 
                onChange={(e) => setprice(e.target.value)} required />

           
            <label htmlFor="image">Course Image</label>
            <div id='image-container'>
                <input type="file" onChange={(e) =>{   setImage(e.target.files[0])
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setshowimage(reader.result);
                    };
                    }} accept="image/*" />
                <button onClick={StoreImage} id='imageuploadbtn' >Upload Image</button>
            </div>
            {imgurl!==null && <div>Image Uploaded Succesfully</div>}
            {isPending && <div>Failed to upload the image</div> }
            {error && <div>Failed to upload the image</div> }
            {showimage && <img src={showimage} alt="" width="300" height="200"/> }

            <button type="submit">Create Course</button>
        </form>
        </div>
    </div>
  )
}

export default Newcourse;
