import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import axios from "axios";
import { useSetRecoilState,useRecoilState } from 'recoil';
import { roleState } from './store/atom/role';
import { userState } from './store/atom/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password,setPasword] = useState('')
    const setUser = useSetRecoilState(userState);
    const [role,setRole] = useRecoilState(roleState)
    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome back. Sign in below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20}}>
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
                    fullWidth={true}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <br/><br/>
                <TextField
                    fullWidth={true}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    onChange={(e)=>{
                        setPasword(e.target.value)
                    }}
                />
                <br/><br/>

                <Button size={"large"} variant="contained"
                onClick={async ()=>{
                    if(role === 'Admin'){
                        const response = await axios.post("http://ec2-16-171-175-60.eu-north-1.compute.amazonaws.com/admin/login",{
                        username:email,
                        password:password
                    },{
                        headers:{
                            "Content-type": "application/json"
                        }
                    });
                    const data = response.data
                    localStorage.setItem('token',data.token)
                    setUser(email)
                    setRole(role)
                    navigate('/courses')
                    }
                    else{
                        const response = await axios.post("http://ec2-16-171-175-60.eu-north-1.compute.amazonaws.com/users/login",{
                        username:email,
                        password:password
                    },{
                        headers:{
                            "Content-type": "application/json"
                        }
                    });
                    const data = response.data
                    localStorage.setItem('token',data.token)
                    setUser(email)
                    setRole(role)
                    navigate('/Usercourses')
                    }
                    
                }}> Signin</Button>
            </Card>
        </div>
    </div>
}

export default Signin;