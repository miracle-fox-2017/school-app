const express=require("express");
const router=express.Router();

// Import Model
const Model=require("../models");
const score=require("../helpers/nilai");

router.get("/",(req,res)=>{ // Halaman awal subject
    Model.Subject.findAll().then((rows)=>{
        const withTeachers=rows.map((subject)=>{
            return new Promise((resolve,reject)=>{
                subject.getTeachers().then((teachers)=>{
                    let listTeacher=[];
                    teachers.map((teacher)=>{
                        listTeacher.push(teacher.dataValues.first_name+" "+teacher.dataValues.last_name);
                    });
                    subject.teacher=listTeacher;
                    resolve(subject);
                });
            });
        });
        Promise.all(withTeachers).then((test)=>{
            res.render("subjects",{subjectRows:rows});
        })
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman enrolled students
router.get("/:id/enrolledstudents",(req,res)=>{
    Model.Subject.findById(req.params.id).then((row)=>{
        Model.Student_Subject.findAll({
            attributes : ["id","StudentId","SubjectId","score"],
            where:{
                SubjectId:row.dataValues.id
            }
        }).then((arrayByStudentId)=>{
            const getId=arrayByStudentId.map((student)=>{
                return student.getStudent().then((studentData)=>{
                    const lastName=studentData.dataValues.last_name;
                    const firstName=studentData.dataValues.first_name;
                    studentData.fullname=firstName+" "+lastName;
                    studentData.conjunctionId=student.dataValues.id;
                    studentData.subject=row.subject_name;
                    studentData.score=student.score;
                    studentData.alphabet=score(student.score);
                    return studentData;
                });
            });
            Promise.all(getId).then((hasil)=>{
                res.render("students-enrolled",{students:hasil});
            });
        });
    }).catch((err)=>{
        res.send(err);
    });
});

// Halaman tambah score
router.get("/:id/givescore",(req,res)=>{
    Model.Student_Subject.findOne({
        where:{
            id:req.params.id
        }
    }).then((conjuction)=>{
        Model.Subject.findById(conjuction.dataValues.SubjectId).then((subject)=>{
            conjuction.getStudent().then((student)=>{
                const score=conjuction.dataValues.score;
                const subjectName=subject.dataValues.subject_name;
                const fullname=student.dataValues.first_name+" "+student.dataValues.last_name;
                student.score=score;
                student.subject=subjectName;
                student.fullname=fullname;
                student.conjunctionId=req.params.id;
                res.render("edit-student-score",{data:student});
            });
        });
    });
});

// Action tambah score
router.post("/:id/givescore",(req,res)=>{
    Model.Student_Subject.update(req.body,{
        where:{
            id:req.body.id
        }
    }).then((stats)=>{
        res.redirect("/subjects");
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
