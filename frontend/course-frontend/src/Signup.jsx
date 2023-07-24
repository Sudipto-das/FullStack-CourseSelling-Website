import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import {  useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Navigate, useNavigate } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useRecoilState(roleState)
  const navigate = useNavigate()


  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20, }}>
          
          <select 
            style={{padding:'0.7em 1em',background:"#CCCCFF",marginBottom:'0.5em',borderRadius:'0.2em' }}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
            if(role==='Admin'){
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then((res) => {
                res.json().then((data) => {
                  localStorage.setItem("token", data.token);
                  navigate('/courses')
                
                });
              });
            }
            else {
                fetch("http://localhost:3000/users/signup", {
                    method: "POST",
                    body: JSON.stringify({
                      username: email,
                      password: password,
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then((res) => {
                    res.json().then((data) => {
                      localStorage.setItem("token", data.token);
                      navigate('/usercourses')
                      
                    });
                  });
            }
            }}
          >
            {" "}
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
}
export const roleState = atom({
  key: "roleState",
  default: '',
});

export default Signup;
