import express from "express";
import userRouter from "./routers/user.js";
import {config} from "dotenv";

export const app = express();

config({
    path: "./data/config.env"
});

// Using Middlewares
app.use(express.json())

// Using Routes
app.use("/api/v1/users",userRouter)



app.get("/", (req,res) =>{
    res.send("Nice Working");
});
