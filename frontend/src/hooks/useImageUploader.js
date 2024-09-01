import { useState, useEffect } from "react";
import axios from "axios";

const useImageUploader = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const postimage = (url,formdata) => {
    axios.post(url, formdata , {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      .then(res => {
        if(res.data.msg === "Succesfully"){
            console.log('File uploaded successfully.');
            let imguri = res.data.filename;
            console.log(imguri)
            setData(imguri);
            setIsPending(false);
            setError(false);
        }else{
          setIsPending(true);
          setError(false);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsPending(false);
        setError(true);
      });  
    }

    useEffect(() => {
        setData(data);
    }, [data]);


    return [postimage, data, isPending, error];
}
export default useImageUploader;