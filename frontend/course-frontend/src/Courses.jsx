import { Button, Card } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setCourses(data.course);
        console.log(data.course);
      });
    });
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
};
export function Course(props) {
  const navigate = useNavigate()
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        backgroundImage: `url(${props.course.imageLink})`, // Set the background image
        backgroundSize: "cover", // Adjust background size to cover the whole card
        backgroundPosition: "center", // Center the background image
        color:"white",
        position: "relative",
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1" style={{
       position:'absolute',
       bottom:8,
       right:10
      }}>
        Rs:{props.course.price}
      </Typography>
      <Button size={"small"} variant="contained" style={{
      position: "absolute", // Set the position of the Button to absolute
      bottom: 10, // Adjust the distance from the bottom
      left: 10, // Adjust the distance from the left
    }}onClick={()=>{
         navigate("/course/" + props.course._id);
         
      }}>
        update
      </Button>
      
    </Card>
    
  );
}
export default Courses;
