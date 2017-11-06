const express = require('express');
const Models = require('../models');
const ScoreByLetter = require('../helper/enrolledByLetter')

const route = express.Router();



route.get('/',(req,res)=>{
  let arr = []
  Models.Subject.findAll().then(subjects => {
    subjects.forEach((subject,index) => {
      // subject['teacher'] = [];
      Models.Teacher.findAll({where: {subjectId: subject.id}}).then(teachers => {
        subject.teacher = teachers
        arr.push(subject)

        if(index === subjects.length-1) {
          // console.log(arr);
          res.render('subject',{subject:arr, title : "All Data Subject"})
        }

      })
      // teachers.forEach(teacher =>{
      //   if (teacher.subjectId == subject.id){
      //
      //   }
    //   })
    //
    })
  //   let newdata = subjects.map( subject => {
  //     return new Promise ((resolve,reject)  => {
  //       subject.getTeacher().then( teacher => {
  //         subject.dataTeacher = teacher;
  //         resolve(subject)
  //       })
  //     })
  //   })
  //   Promise.all(newdata).then( datasubject => {
        // res.send(subjects)
      // res.render('subject',{subject : datasubject})
  //   })
    // res.render('subject',{subject:data})
  })
})

route.get('/:id/enrolledstudents',(req,res) => {
  Models.Subject.findById(req.params.id,{
    include: [{
      model : Models.SubjectWithStudent,
      include : [{
        model : Models.Student,
        order : [[Models.Student,'first_name', 'ASC']]
      }]
    }]
  })
  .then(subjects => {
    // console.log(subjects);
      // subjects.getSubjectWithStudents().then(subjectstudent =>{
      //     let newsubject = subjectstudent.map( data => {
      //       console.log(data);
      //       return new Promise ((resolve, reject) => {
      //         data.getStudents().then(student=>{
      //           subjects.student = student;
      //           resolve(subjects)
      //         })
      //       })
      //     })


    // Models.SubjectWithStudent.findAll({where: {subjectId:req.params.id}}).then( subject => {
    //   let newsubject = subject.map( data => {
    //     return new Promise ((resolve, reject) => {
    //       // console.log(data);
    //       data.getStudent().then( student =>{
    //         // console.log(student);
    //         data.student = student;
    //         console.log(data);
    //       })
    //     })
    //   })

    //   Promise.all(newsubject).then(subjectwithstudent => {
    //     // console.log(subjectwithstudent);
    //     // res.send(subjectwithstudent)
        let SubjectScore = ScoreByLetter(subjects);
        res.render('enrolledstudents',{subjects : SubjectScore, title : 'Enrolled Data Subject'})
    //   })
    // })
  })
    // let newsubject = subjects.map( subject)
    // res.render('enrolledstudents',{subject : subjects})
  // })

})

route.get('/:subjectid/:studentid/givescore',(req,res) => {
  Models.Subject.findById(req.params.subjectid)
  .then(subject => {
    Models.Student.findById(req.params.studentid)
    .then(student => {
      // res.send(student)
      res.render('givescore',{subject : subject , student : student, title : 'Give Score Student'})
    })
  })
  // res.render('giveScore')
})


route.post('/:subjectid/:studentid/givescore',(req,res)=>{
  Models.SubjectWithStudent.update({score : req.body.score},{where : {subjectId : req.params.subjectid ,studentId : req.params.studentid}})
  .then( data =>{
    res.redirect(`/subject/${req.params.subjectid}/enrolledstudents`)
  })

})





module.exports = route;
