const express = require('express');
const router = express.Router();
const db = require('../models')



//menampilkan semua data Student
router.get('/', (req,res) => {
  db.Student.findAll({
    order:[['first_name','ASC']]
  }).then((dataStudents) => {
    res.render('students',{dataStudents});
  }).catch((err)=>{
    console.log(err);
  })
})

//menampilkan input data subject
router.get('/:id/addsubject',(req,res)=>{
  db.Student.findById(req.params.id).then((dataStudents) => {
    db.Subject.findAll().then(dataSubjects => {
      res.render('addSubjectsToStudents',{dataStudents,dataSubjects});
  })
}).catch((err)=>{
    console.log(err);
  })
})

//menerima input data subject
router.post('/:id/addsubject',(req,res)=>{
  // console.log(req.body);
  db.SubjectStudent.create(req.body).then((data) => {
      res.redirect('/students');
    }).catch((err)=>{
    console.log(err);
    })
})


//mengirim data yang sudah di input
router.get('/add',(req,res) => {
  res.render('addstudents')
})

//Menerima input students
router.post('/add',(req,res) => {
  db.Student.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  }).then(function(){
    res.redirect('/students');
  });
});


//menampilkan data student berdasarkan id
router.get('/edit/:id',(req,res) => {
  db.Student.findById(req.params.id).then((dataStudents) => {
    res.render('editstudents',{dataStudents});
  }).catch((err)=>{
  console.log(err);
  })
})

//mengirim input data student berdasarkan id
router.post('/edit/:id',(req,res) => {
  db.Student.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email},{ where:{id:req.params.id}
  }).then(function(){
    res.redirect('/students');
  }).catch((err)=>{
  console.log(err);
  })
})


//delete data student
router.get('/delete/:id',(req,res)=>{
  db.Student.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/students');
  });
});


module.exports = router
