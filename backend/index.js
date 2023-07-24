const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const SECRETKEY = "TOPsecret";
//schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchesedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRETKEY, (err, user) => {
      if (err) {
        return res.status(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
mongoose.connect(
  "mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Admin routes
app.get('/admin/me',authenticateJwt,(req,res)=>{
  const username = req.user.username
  res.json({'massage':username})

})
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.json({ massage: "admin already exsits" });
  } else {
    const token = jwt.sign({ username, role: "admin" }, SECRETKEY, {
      expiresIn: "1h",
    });
    const newAdmin = new Admin({ username: username, password: password });
    newAdmin.save();
    res.json({ massage: "admin register sucsessfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRETKEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post("/admin/courses", authenticateJwt, (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.json({ massage: "course updated sucsessfully", courseId: course.id });
  }
});

app.get("/admin/courses", authenticateJwt, async (req, res) => {
  // logic to get all courses
  // console.log("get worked");
  const course = await Course.find({});
  
  res.json({ course });
});

// User routes
app.get('/user/me',authenticateJwt,(req,res)=>{
  const username = req.user.username
  res.json({'username':username})

})
app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRETKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRETKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

app.post("/users/courses/:courseId", async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchesedCourse.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.json({ massage: "user not found" });
    }
  } else {
    res.json({ massage: "course not found" });
  }
});

app.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchesedCourse"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.json({ massage: "user not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
