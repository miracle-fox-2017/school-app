const express = require('express');
const Models = require('../models');

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
          res.render('subject',{subject:arr})
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
  // Models.Subject.findById(req.params.id).then(subjects => {
    Models.SubjectWithStudent.findAll({where: {subjectId:req.params.id}}).then( subject => {
      let newsubject = subject.map( data => {
        return new Promise ((resolve, reject) => {
          data.getStudent().then( student =>{
            data.student = student;
          })
        })
      })

      Promise.all(newsubject).then(subjectwithstudent => {
        console.log(subjectwithstudent);
        res.send(subjectwithstudent)
        // res.render('enrolledstudents',{subject : subjects})
      })
    })
      // })
    // let newsubject = subjects.map( subject)
    // res.render('enrolledstudents',{subject : subjects})
  // })

})




module.exports = route;
