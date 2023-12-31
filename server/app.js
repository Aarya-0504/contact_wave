require("dotenv").config({path: "./config/config.env"});
const express=require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
const connectDB=require('./config/db');
const { path } = require("express/lib/application");
const auth = require("./middlewares/auth");
const app=express();



//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require('cors')());
//routes
// app.get("/",(req,res)=>{res.send("hello world");});
app.use("/api",require("./routes/auth"));
app.use("/api", require("./routes/contact"));
    
//server conf

const PORT=process.env.Port || 8000
app.listen(PORT,async ()=>{
    // try{
    //     await connectDB();
    // }
    // catch(e){
    //     console.log(e);
    // }
    connectDB();
    console.log(`server listening on port: ${PORT}`)});