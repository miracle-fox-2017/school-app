const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");

router.get("/",(req,res)=>{
    Model.Teacher.findAll().then((rows)=>{
        res.render("teachers",{teachersRows:rows});
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
