const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");

// Halaman awal students
router.get("/",(req,res)=>{
    Model.Student.findAll({
        order:[["first_name","ASC"]]
    }).then((rows)=>{
        const newObject=rows.map((value)=>{
            value.dataValues.fullname=value.getFullName();
            return value;
        });
        res.render("students",{studentRows:newObject});
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman tambah student
router.get("/add",(req,res)=>{
    res.render("add-student",{error:""});
});

// Action tambah student
router.post("/add",(req,res)=>{
    Model.Student.create(req.body).then((stats)=>{
        res.redirect("/students");
    }).catch((err)=>{
        res.render("add-student",{error:err.errors[0].message});
    });
});

// Halaman edit student
router.get("/edit/:id",(req,res)=>{
    Model.Student.findById(req.params.id).then((rows)=>{
        res.render("edit-student",{data:rows,error:""});
    }).catch((err)=>{
        res.send(err);
    });
});

// Action edit student
router.post("/edit/:id",(req,res)=>{
    Model.Student.update(req.body,{
        where:{id:req.body.id}
    }).then((stats)=>{
        res.redirect("/students");
    }).catch((err)=>{
        Model.Student.findById(req.body.id).then((rows)=>{
            res.render("edit-student",{data:rows,error:err.errors[0].message});
        });
    });
});

// Action hapus student
router.get("/delete/:id",(req,res)=>{
    Model.Student.destroy({
        where:{id:req.params.id}
    }).then((stats)=>{
        Model.Student_Subject.destroy({
            where:{StudentId:req.params.id}
        }).then((stats)=>{
            res.redirect("/students");
        });
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman tambah subjek pada student
router.get("/:id/addsubject",(req,res)=>{
    Model.Student.findById(req.params.id).then((row)=>{
        row.fullname=row.dataValues.first_name+" "+row.dataValues.last_name;
        Model.Subject.findAll().then((subject)=>{
            res.render("add-subject-student",{murid:row,subject:subject});
        });
    }).catch((err)=>{
        res.send(err);
    });
});

// Action tambah subjek pada student
router.post("/:id/addsubject",(req,res)=>{
    Model.Student_Subject.create(req.body).then((stats)=>{
        res.redirect("/students");
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
