import {app} from "./app.js";
import { connectDb } from "./data/database.js";

connectDb();

app.listen(4000,()=>{
    console.log("Server is running");
})