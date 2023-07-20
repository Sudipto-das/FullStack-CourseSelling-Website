import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
function Course() {
  let { courseId } = useParams();
  console.log("hi there from course");

  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.course);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div>
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
}

function UpdateCard(props) {
  console.log("hi there from update card");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [courses, setCourses] = useRecoilState(coursesState);

  console.log("UpdateCard rerendered");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
        <Typography>Update course details</Typography>

        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
          style={{ marginBottom: "1em" }}
        />

        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
          style={{ marginBottom: "1em" }}
        />

        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image link"
          variant="outlined"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          fullWidth={true}
          label="Price"
          variant="outlined"
          style={{ marginBottom: "1em" }}
        />

        <Button
          size={"large"}
          variant="contained"
          onClick={() => {
            function callback2(data) {
              let updatedCourses = [];
              for (let i = 0; i < courses.length; i++) {
                if (courses[i]._id == props.courseId) {
                  updatedCourses.push({
                    _id: props.courseId,
                    title: title,
                    description: description,
                    imageLink: image,
                    price: price,
                  });
                } else {
                  updatedCourses.push(courses[i]);
                }
              }
              setCourses(updatedCourses);
            }
            function callback1(res) {
              res.json().then(callback2);
            }
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: image,
                price: price,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }).then(callback1);
          }}
        >
          {" "}
          Update course
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const courses = useRecoilValue(coursesState);
  console.log(courses);
  let course = null;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id == props.courseId) {
      course = courses[i];
    }
  }
  console.log(course);

  if (!course) {
    return "loading...";
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          backgroundImage: `url(${course.imageLink})`,
          backgroundSize: "cover", // Adjust background size to cover the whole card
          backgroundPosition: "center",
          color: "white",
          position:'relative'
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
          {course.description}
        </Typography>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
          }}
        >
          Rs:{course.price}
        </Typography>
        {/* <img src={course.imageLink} style={{ width: 300 ,}}></img> */}
      </Card>
    </div>
  );
}

export default Course;

const coursesState = atom({
  key: "coursesState",
  default: [],
});
