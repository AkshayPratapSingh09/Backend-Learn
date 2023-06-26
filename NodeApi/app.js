import express from "express";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
    path: "./data/config.env"
});

// Using Middlewares
app.use(express.json())

// 
app.use(cookieParser())

// Using Routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)



app.get("/", (req,res) =>{
    res.send("Nice Working");
});

// Error Middleware
app.use(errorMiddleware)
