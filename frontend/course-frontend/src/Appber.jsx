
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";


const Appber = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        
          setEmail(data.massage);
          
        
      });
    });
  }, []);
 
 if(email){
  return <div style={{
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    marginBottom:"1em",
    zIndex: 1,
    background:"#CCCCFF"
    
}}>
    <div style={{marginLeft: 10}}>
        <Typography variant={"h6"} style={{fontWeight:"bold"}}>Coursera</Typography>
    </div>

    <div style={{display: "flex"}}>
        <div style={{marginRight: 10, display: "flex"}}>
        <div style={{marginRight: 10}}>
                <Button
                    onClick={() => {
                        navigate("/addcourse")
                    }}
                >Add course</Button>
            </div>

            <div style={{marginRight: 10}}>
                <Button
                    onClick={() => {
                        navigate("/courses")
                    }}
                >Courses</Button>
            </div>

            <Button
            style={{background:"black"}}
                variant={"contained"}
                onClick={() => {
                    localStorage.setItem("token", null);
                    window.location = "/";
                }}
            >Logout</Button>
        </div>
    </div>
</div>
 }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        color: "white",
        background: "blue",
      }}
    >
      <div>
        <Typography variant={"h6"} style={{ fontWeight: "bolder" }}>
          Coursera
        </Typography>
      </div>

      <div style={{}}>
        <Avatar alt="Remy Sharp" src="" />
      </div>
    </div>
  );
};

export default Appber;
