const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");

router.get("/",(req,res)=>{
    Model.Teacher.findAll({
        order:[["first_name","ASC"]]
    }).then((rows)=>{
        const withSubject=rows.map((teacher)=>{
            if(teacher.dataValues.SubjectId === null){
                teacher.subject="Unassingned";
                return teacher;
            }else{
                return new Promise((resolve,reject)=>{
                    teacher.getSubject().then((subject)=>{
                        teacher.subject=subject.dataValues.subject_name;
                        resolve(teacher);
                    })
                });
            }
        });
        Promise.all(withSubject).then((newTeacher)=>{
            res.render("teachers",{teachersRows:newTeacher});
        });
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman tambah guru
router.get("/add",(req,res)=>{
    Model.Subject.findAll().then((rows)=>{
        res.render("add-teacher",{subjectlist:rows});
    }).catch((err)=>{
        res.send(err);
    });
});

// Action tambah guru
router.post("/add",(req,res)=>{
    Model.Teacher.create(req.body).then((stats)=>{
        res.redirect("/teachers");
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman edit guru
router.get("/edit/:id",(req,res)=>{
    Model.Teacher.findById(req.params.id).then((teacherRows)=>{
        Model.Subject.findAll().then((subjectRows)=>{
            res.render("edit-teacher",{data:teacherRows,subject:subjectRows,error:""});
        });
    }).catch((err)=>{
        res.send(err);
    });
});

// Action edit guru
router.post("/edit/:id",(req,res)=>{
    Model.Teacher.update(req.body,{
        where:{id:req.body.id}
    }).then((stats)=>{
        res.redirect("/teachers");
    }).catch((err)=>{
        Model.Teacher.findById(req.body.id).then((teacherRows)=>{
            Model.Subject.findAll().then((subjectRows)=>{
                res.render("edit-teacher",{data:teacherRows,subject:subjectRows,error:err.errors[0].message});
            });
        });
    });
});

// Action hapus guru
router.get("/delete/:id",(req,res)=>{
    Model.Teacher.destroy({
        where:{id:req.params.id}
    }).then((stats)=>{
        res.redirect("/teachers");
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
