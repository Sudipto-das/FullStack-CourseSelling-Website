import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import {Typography} from "@mui/material";
const Purchesed = ()=>{
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        fetch('http://ec2-16-171-160-8.eu-north-1.compute.amazonaws.com:3000/users/purchasedCourses',{
            method:'GET',
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json",
            }
        }).then((res)=>{
            res.json().then((data)=>{
                setCourses(data.purchesedCourse)
                console.log(data.purchesedCourse)
            })
        })
    },[])
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map((course)=>{
                return <div>
                    <PurchesedCourses course = {course}/>
                </div>
            })}
        </div>
    )
}
export const PurchesedCourses = (props)=>{
    return (
        <Card
          style={{
            margin: 10,
            width: 300,
            minHeight: 200,
    
            position: "relative",
          }}
        >
          <img
            src={props.course.imageLink}
            alt={props.course.title}
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
          <Typography textAlign={"center"} variant="h5">
            {props.course.title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle1">
            {props.course.description}
          </Typography>
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
            Rs:{props.course.price}
          </Typography>
          <br />
          <br />
         
        </Card>
      );
}

export default Purchesed;