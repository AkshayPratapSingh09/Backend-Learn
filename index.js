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

import express from 'express';

const app = express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render("index",{name:'Akshay',class:'12th',section:'A'})
})

app.listen(5000,()=>{
    console.log("Servered")
})