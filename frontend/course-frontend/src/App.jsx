import { useState } from "react";
import LandingPage from "./LandingPage";
import Signin from "./Signin";
import Signup from "./Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import Appbar from "./Appber";

import UserCourses from "./UserCourses";

function App() {

 
  return (
    <div>
      
        <Router>
        <Appbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/usercourses" element={<UserCourses />} />
          </Routes>
          
        </Router>
      
    </div>
  );
}
export default App;
