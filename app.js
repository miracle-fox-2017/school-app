const parser=require("body-parser");
const express=require("express");
const app=express();

// Serve Static File
app.use(express.static("public"));

// Setup Body Parser
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// Setup View Engine
app.set("views","./public");
app.set("view engine","ejs");

// Routing
const teachers=require("./router/teachers");
app.use("/teachers",teachers);

const subjects=require("./router/subjects");
app.use("/subjects",subjects);

const students=require("./router/students");
app.use("/students",students);

// Check Server
app.listen(3000,()=>{
    console.log("Server started! Listening on Port 3000");
});
