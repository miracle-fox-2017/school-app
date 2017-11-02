const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");

router.get("/",(req,res)=>{
    Model.Subject.findAll().then((rows)=>{
        res.render("subjects",{subjectRows:rows});
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
