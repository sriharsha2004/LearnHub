import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import './App.css';
import About from './components/about';
import Home from './components/home';
import Notfound from './components/Notfound';
import Login from './components/login';
import Register from './components/register';
import StudentHome from './components/student/StudentHome';
import InstructorHome from "./components/Instructor/InstructorHome"
import Courses from './components/student/courses';
import Newcourse from './components/Instructor/newcourse';
import InstructorCourses from "./components/Instructor/courses";
import Modulesviewer from './components/Instructor/modulesviewer';
import Newmodule from './components/Instructor/newmodule';
import Mycourses from './components/student/mycourses';
import Moduleviewer from './components/student/moduleviewer';
import Quiz from './components/Instructor/Quiz';
import QuizViewer from './components/Instructor/quizviewer';
import Attemptquiz from './components/student/Attemptquiz';
import Badges from './components/student/Badges';

import { RoleProvider, useRole } from './RoleContext'

function App() {
  const {role , setRole} = useRole();
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* student */}
           {role === "Student" && (
              <>
                <Route path="/StudentHome" element={<StudentHome/>}/>
                <Route path="/courses" element={<Courses/>} />
                <Route path="/mycourses" element={<Mycourses/>}/>
                <Route path="/coursemodules/:id" element={<Moduleviewer/>} />
                <Route path="/Attemptquiz/:id" element={<Attemptquiz/>}/>
                <Route path="/myBadges" element={<Badges/>} />
              </>
           )}

            {/* Instructor */}
            {role == "Instructor" && (
              <>
                <Route path="/InstructorHome" element={<InstructorHome/>}/>
                <Route path="/addcourse" element={<Newcourse/>}/>
                <Route path="/addedcourses" element={<InstructorCourses/>} />
                <Route path="/modules/:id" element={<Modulesviewer/>}/>
                <Route path="/addquiz/:id" element={<Quiz/>} />
                <Route path="/viewquiz/:id" element={<QuizViewer/>}/>
                </>
            )}
            {/* <Route path="" element={<Newmodule/>}/> */}

            <Route path="*" element={<Notfound/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
