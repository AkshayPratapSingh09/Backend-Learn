import express from "express";
import userRouter from "./routers/user.js";

export const app = express();

app.use(express.json())
app.use("/users",userRouter)



app.get("/", (req,res) =>{
    res.send("Nice Working");
});
