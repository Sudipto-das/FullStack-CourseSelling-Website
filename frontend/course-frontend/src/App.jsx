import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Signin from "./Signin";
import Signup from "./Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import Appbar from "./Appber";
import { userState } from "./store/atom/user";
import UserCourses from "./UserCourses";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";

import Purchesed from "./Purchesed";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <InitUser />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/usercourses" element={<UserCourses />} />
          <Route path="/purschesedcourses" element={<Purchesed />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
function InitUser() {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      console.log('hello')
      const response = await fetch("http://ec2-16-171-160-8.eu-north-1.compute.amazonaws.com:3000/user/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setUser(data);
        console.log(data);
      } else {
        setUser(null);
        console.log(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}


export default App;
