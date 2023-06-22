import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json())

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backendapi",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", Schema);

app.get("/", (req,res) =>{
    res.send("Nice Working");
});

app.get("/users/all", async (req,res) => {
    
    const users = await User.find({})

    res.json ({
        success:true,
        users,
    })
})

app.post("/users/new", async (req,res) => {
    const {name,email,password} = req.body

    await User.create({
        name,
        email,
        password,

    });

    res.json ({
        success:true,
        message:"Registered Successfully",
    })
})



app.listen(4000, () => {
  console.log("Server is working");
});
