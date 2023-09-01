import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Checkbox, Typography} from "@mui/material";
import { useState } from 'react';
const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('')
  return (
    <div>
      <div
        style={{
          paddingTop: 100,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Add Course in Bellow</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type={"text"}
          />
          <br />
          <br />
          <TextField
          onChange={(e)=>{
            setImage(e.target.value)
          }}
            fullWidth={true}
            id="outlined-basic"
            label="ImageLink"
            variant="outlined"
            type={"text"}
          />
          <br />
          <br />
          <TextField
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
            fullWidth={true}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type={"text"}
          />
          <br/>
          <br />
          <Checkbox/>published
          <br />
          <Button size={"large"} variant="contained" 
          onClick={()=>{
            fetch('http://ec2-16-171-175-60.eu-north-1.compute.amazonaws.com/admin/courses',{ method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
                imageLink: image,
                price:price,
                published: true
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then((res)=>{
            res.json().then((data)=>{
              console.log(data)
              alert('course added')
            })
          })
          }}>
            
            ADD
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default AddCourse;
