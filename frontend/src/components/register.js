import React from 'react';
import { useState } from 'react';

import Navbar from './navbar';
import useFetchpost from '../hooks/useFetchPost';

const Register = () => {
    const [name,setName] = useState("")
    const [rollno, setRollno] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");

    const [postrequest,data,isPending,error] = useFetchpost();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formdata = {rollno,name,password,role}
      postrequest("http://localhost:8081/validate/register",formdata)
  
    };
  
    return (
        <div>
            <Navbar/>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
  
        <label htmlFor="rollno">{role === "Student" ? "Roll Number" : "Instructor ID"}</label>
        <input  type="text"  id="rollno"  name="rollno"  value={rollno}
            onChange={(e) => setRollno(e.target.value)} required />

        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={name}
                onChange={(e) => setName(e.target.value)} required/>

        <label htmlFor="password">Password</label>
        <input type="password"  id="password" name="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
        />
  
        <label htmlFor="role">Role</label>
        <select id="role" name="role"  value={role} onChange={(e) => setRole(e.target.value)}  >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>

  
        <button type="submit">Register</button>

          {error && <p className="error-message">Error occured ..</p>}
          {isPending && <p className="pending-message">Registration Failed ...</p>}

        </form>
      </div>
      </div>
    )
}

export default Register;
