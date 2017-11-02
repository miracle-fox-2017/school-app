const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");

router.get("/",(req,res)=>{
    Model.Student.findAll().then((rows)=>{
        res.render("students",{studentRows:rows});
    }).catch((err)=>{
        res.send(err);
    });
});

router.get("/add",(req,res)=>{
    res.render("student-add");
});

router.post("/add",(req,res)=>{
    Model.Student.upsert(req.body).then((object)=>{
        res.redirect("/students");
    }).catch((err)=>{
        res.send(err);
    });
});

router.get("/delete/:id",(req,res)=>{
    Model.Student.destroy({
        where:{
            id:req.params.id
        }
    }).then((object)=>{
        res.redirect("/students");
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
