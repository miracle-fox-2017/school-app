const express = require('express');
const router = express.Router();
const db = require('../models')


//menampilkan semua data Student
router.get('/', (req,res)=>{
  db.Student.findAll().then((data) => {
    res.render('students',{data});
}).catch((err)=>{
  console.log(err);
})
})

//mengirim data yang sudah di input
router.get('/add',(req,res)=>{

  res.render('addstudents')
})

//Menerima input students
router.post('/add',(req,res)=>{
  db.Student.bulkInsert('Students',[{
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  }])
  res.redirect('/students')
})

//menampilkan data student berdasarkan id
router.get('/edit/:id',(req,res)=>{
  
})



module.exports = router
