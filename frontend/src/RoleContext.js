import { createContext, useContext, useState , useEffect} from 'react';
import axios from "axios";

import SetAuthToken from "./components/SetAuthToken";

const RoleContext = createContext();


export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState();

  useEffect(()=>{
    getRole();
  } , [role])

  var getRole = async () => {
    SetAuthToken(localStorage.getItem("token"));
    await axios.get("http://localhost:8081/verifyToken").then((res) => {
        if(res.data.msg !== "token not found" || res.data.msg !== "Invalid token"){
            setRole(res.data.role);
        }
    })
  }

//   useEffect(()=>{
//     console.log(localStorage.getItem("token"));
//     SetAuthToken(localStorage.getItem("token"));
//     axios.get("http://localhost:8081/verifyToken").then((res)=>{
//         console.log(res.data);        
//         // console.log(res);
//         // setRole(res.role)
//     })
//   })


//   useEffect(()=>{
//     getToken("http://localhost:8081/verifytoken")
//     setRole(r)
//         if(r != undefined){
//           console.log(r);
//           setRole(r);
//         }
//   },[r])

//   const [role, setRole] = useState(() => {
//       return r;
//   });

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
