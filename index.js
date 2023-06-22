// console.log("Hello Duniya")
// import { var1 } from './features.js';
// import http from 'http';

// // const http = require('http');
// console.log(var1)
// const server = http.createServer((req,res)=>{
//     if (req.url ==="/"){
//         res.end("<h1>Home Page!");
//     }
//     else if (req.url ==="/about"){
//         res.end("<h1>About Page!");
//     }
//     else if (req.url ==="/contact"){
//         res.end("<h1>Contact Page!");
//     }
//     else {
//         res.end("<h1>Page Not found</h1>")
//     }
//     console.log("Served");
// });

// server.listen(5000, () =>{
//     console.log("Server is woring");
// });

// // Version -> Database Activity
// import express from "express";
// import path from "path";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";

// mongoose
//   .connect("mongodb://127.0.0.1:27017", {
//     dbName: "backend",
//   })
//   .then(() => {
//     console.log("Database Connected Successfully");
//   });

// const messageSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });
// const message = mongoose.model("messages", messageSchema);

// const app = express();

// app.use(express.static(path.join(path.resolve(), "public")));
// // Middleware Used
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.set("view engine", "ejs");

// const isAuthenticated = (req,res)=>{
//     const { token } = req.cookies;
//     if (token) {
//         next();
//       } else {
//         res.render("login");
//       }
// }

// app.get("/", isAuthenticated,(req, res) => {
//     res.render('logout');

// });

// // app.get('/success',(req,res)=>{
// //     res.render("success");
// // })

// // app.get('/add',(req,res) =>{
// //     message.create({name:"Akshay",email : "sample@gmail.com"}).then(()=>{
// //         res.redirect("success");

// //     })
// // })

// // app.post('/contact', async (req,res)=>{
// //     const {name,email}= req.body;
// //     await message.create({name,email});
// //     res.redirect('/success')

// // });

// app.post("/login", (req, res) => {
//   res.cookie("token", "iamin", {
//     httpOnly: true,
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });

// app.get("/logout", (req, res) => {
//   res.cookie("token", null, {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.redirect("/");
// });
// app.listen(5000, () => {
//   console.log("Servered");
// });

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("Database Connected Successfully");
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

app.listen(5000, () => {
  console.log("Servered");
});

app.get('/register',(req,res) =>{
  res.render("register");
})

app.post('/login', async (req,res) =>{
  const {email,password} = req.body;

  let user = await User.findOne({email});

  if(!user) return res.redirect('/register');
  
  const isMatch = await bcrypt.compare(password,user.password);
  
  if (!isMatch)
  return res.render('login',{email,message:"Incorrect Password"})
  
  const token = jwt.sign({_id:user._id},"sfwegthsageger")
  
  
  res.cookie("token",token,{
    httpOnly:true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
  });

app.post("/register",async (req,res) =>{
  const {name,email,password} = req.body;
  
  let user = await User.findOne({email});
  if (user){
    return res.redirect("/login");
  }

const hashedPassword = await bcrpyt.hash(password,10);

user = await User.create({
  name,
  email,
  password:hashedPassword,
})

const token = jwt.sign({_id:user._id},"sfwegthsageger")

res.cookie("token",token,{
  httpOnly:true,
  expires: new Date(Date.now() + 60 * 1000),
});
res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
