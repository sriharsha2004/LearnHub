import { useState} from "react";
import {useNavigate , useLocation } from "react-router-dom"
import axios from "axios";

import SetAuthToken from "../components/SetAuthToken";

import { useRole } from "../RoleContext";


const useFetchpost = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location  = useLocation();

  const { role , setRole } = useRole();

  const postrequest = (url,formdata) => {
    SetAuthToken(localStorage.getItem("token"));
    axios.post(url, formdata)
      .then(res => {
        // console.log(res.data);
        if(res.data === "Invalid User"){
            setIsPending(true);
            setError(false);
        }
        else if(res.data === "Error Occured"){
            setError(true);
            setIsPending(false);
        }
        else if(res.data.msg === "Invalid token" || res.data.msg === "token not found"){
          navigate("/login");
        }
        else{
            setData(res.data);
            setIsPending(false);
            setError(false);
            // console.log(location.pathname);
            if(location.pathname === "/login"){
              localStorage.setItem("token",res.data.token);
              if(formdata.role === "Student"){
                  setRole("Student");
                 navigate("/StudentHome");
              }
              if(formdata.role === "Instructor"){
                  setRole("Instructor");
                 navigate("/InstructorHome")
              }
            }
            else if(location.pathname === "/register") navigate("/login");
            else if(location.pathname === "/addcourse") navigate("/addedcourses");
            
        }
      })
      .catch(error => {
        // console.error("Error fetching data:", error);
        setIsPending(false);
        setError(true);
      });  
    }
    return [postrequest, data, isPending, error];
}
export default useFetchpost;