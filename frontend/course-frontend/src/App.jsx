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
import { roleState } from "./store/atom/role";
import Purchesed from "./Purchesed";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        {/* <InitUser /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/usercourses" element={<UserCourses />} />
          <Route path='/purschesedcourses' element={<Purchesed/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
// function InitUser() {
//   const setUser = useSetRecoilState(userState);
//   const role = useRecoilValue(roleState)
//   const init = async () => {
//     try {
//       if(role =='admin'){
//         const response = await axios.get(`http://localhost:3000/admin/me`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });

//       if (response.data.massage) {
//         setUser(response.data.massage);
//         console.log(response.data.massage)
//       } else {
//         setUser(null);
//       } 
//       }else{
//         const response = await axios.get(`http://localhost:3000/user/me`, {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });
  
//         if (response.data.massage) {
//           setUser(response.data.massage);
//         } else {
//           setUser(null);
//         }
//       }
      
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   return <></>;
// }

export default App;
