const express = require('express')
const router = express.Router();
const model = require("../models");

router.get('/', function (req, res) {
  model.Subject.findAll().then(subjects => {
    let newSubject = subjects.map(subject => {
      return new Promise((resolve, reject) => {
        subject.getTeachers().then(teacherWith => {
          let arr = [];
          teacherWith.forEach(data => {
            if(subject.id == data.SubjectId){
              arr.push(data.first_name)
            }
          })
          subject.teacher = arr;
          resolve(subject)
        })
      })
    })
    Promise.all(newSubject).then(newSubject => {
      // res.send(newSubject)
      console.log('=========================', newSubject);
      res.render('subjects', {rows : newSubject})
      console.log('===============', rows);
    })
  }).catch(err => {
    console.log(err);
  })
})
router.get('/:id/enrolledstudents', function (req, res){
  model.StudentSubject.findAll({
    where: {SubjectId: req.params.id},
    include: [ {model: model.Student } ],
    order: [ [ model.Student, 'first_name' ] ]
  })
  .then(studentsubjects=>{
    model.Subject.findOne({where: {id: studentsubjects[0].SubjectId} })
    .then(subject=>{
      // res.send(studentsubjects[0])
      res.render('enrolledstudents', {studentsubjects:studentsubjects, subject:subject})
    })
    // console.log(studentsubjects);
  }).catch(err=>{
        console.log(err);
  })
})


router.get('/:id/givescore', function (req, res){
  // res.send('router give score udah jadi')
  model.StudentSubject.findOne({
    where :
    {
      id : req.params.id
    }
  }).then(data => {
    model.Student.findOne({
      where :
      {
        id : data.StudentId
      }
    }).then(student =>{
      model.Subject.findOne({
        where : {
          id : data.SubjectId
        }
      }).then(subject => {
        // res.send(subject)
        res.render('give_score', {student : student, subject : subject})
      })
    })
  })
})

// router.get('/add', function (req, res) {
//   res.render('')
// })

// router.get('/add', function(req,res){
//   res.render('addTeacher', {rows: null});
// })
//
// router.post('/add', function (req, res){
//   model.Teacher.create( {first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email : req.body.email})
//     .then(allTeacher => {
//     res.redirect('/teacher')
//   }).catch(err => {
//     console.log(err);
//     res.render('addTeacher', {rows : err})
//   })
// })












module.exports = router;
