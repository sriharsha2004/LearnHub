import { useState} from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios";

import SetAuthToken from "../components/SetAuthToken";

const useFetchGet = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getrequest = async (url) => {
    const token = localStorage.getItem("token");
    SetAuthToken(token);
    await axios.get(url)
      .then(res => {
        if(res.data === "Failed"){
          setError(true);
          setIsPending(false);
        }
        else if(res.data.msg === "Invalid token" || res.data.msg === "token not found"){
          navigate("/login");
        }
        else{
          setData(res.data);
        }
      })
      .catch(error => {
        localStorage.clear();
        setIsPending(false);
        setError(true);
      });  
    }
    return [getrequest, data, isPending, error];
  // console.log(data);
};
export default useFetchGet;