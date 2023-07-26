import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { userState } from "./store/atom/user";
import { useNavigate } from "react-router-dom";
import { roleState } from "./store/atom/role";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Appber = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const role = useRecoilValue(roleState)
  if (user&&role=='Admin') {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          marginBottom: "1em",
          zIndex: 1,
          background: "#CCCCFF",
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"} style={{ fontWeight: "bold" }}>
            LearningAcademy
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              style={{ background: "black" }}
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (user && role == 'User'){
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          marginBottom: "1em",
          zIndex: 1,
          background: "#CCCCFF",
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"} style={{ fontWeight: "bold" }}>
            LearningAcademy
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate('/purschesedcourses');
                }}
              >
                Purchesed
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/Usercourses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              style={{ background: "black" }}
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        marginBottom: "1em",
        zIndex: 1,
        background: "#CCCCFF",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Typography variant={"h6"} style={{ fontWeight: "bold" ,fontFamily:'monospace'}}>
          LearningAcademy
        </Typography>
      </div>
      <div style={{}}>
        <Avatar alt="Remy Sharp" src="" />
      </div>
    </div>
  );
};

export default Appber;
