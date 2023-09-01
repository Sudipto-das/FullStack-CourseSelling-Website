import { Button, Card } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setCourses(data.courses);
      });
    });
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} key={course._id} />;
      })}
    </div>
  );
};

export function Course(props) {
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        position: "relative", // To enable positioning of the Button
      }}
    >
      <img
        src={props.course.imageLink}
        alt={props.course.title}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <div style={{ padding: "10px" }}>
        <Typography textAlign={"center"} variant="h5">
          {props.course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {props.course.description}
        </Typography>
      </div>
      <br />
      <br />
      <Button
        size={"small"}
        variant="contained"
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
        onClick={() => {
          // Handle the buy button click here
          fetch('http://ec2-16-171-175-60.eu-north-1.compute.amazonaws.com/users/courses/'+props.course._id,{
            method:"POST",
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-type": "application/json",
            }
          }).then((res)=>{
            res.json().then((data)=>{
              alert(data.message)
              console.log(data)
            })
          })
        }}
      >
        BUY
      </Button>
      <Typography
        textAlign={"center"}
        variant="subtitle1"
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontWeight:'bold'
        }}
      >
        Rs: {props.course.price}
      </Typography>
    </Card>
  );
}

export default UserCourses;
