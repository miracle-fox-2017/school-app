const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const db = require('./models');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', './views')
app.set('view engine', 'ejs');

//==============================================

app.get('/teachers', function(req, res) {
  db.Teacher.findAll( { include : [db.Subject] }).then(function (rowTeachers) {
     for(let i = 0 ; i < rowTeachers.length ; i++) {
        rowTeachers[i].getSubject()
          .then(subject => {
            rowTeachers[i].subject_name = subject.subject_name
          })
        }
        res.render('teacher', {rowTeachers})
  }).catch((err) => {
      console.log("ERROR: ", err);
      res.send(err)
    });
})

app.get('/teachers/add', function(req, res) {
  res.render('formTeacher')
})

app.post('/teachers/add', function(req, res) {
  db.Teacher.create(req.body).then(function (berhasil) {
    res.redirect('/teachers')
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/teachers/edit/:id', function(req, res) {
  db.Teacher.findById(req.params.id).then(function(rowTeachers) {
    db.Subject.findAll().then(function(rowSubjects) {
      res.render('editTeacher', { teacher: rowTeachers, rowSubjects: rowSubjects })
    })
  })
})

app.post('/teachers/edit/:id', function(req, res) {
  db.Teacher.update(req.body,
    { where : { id: req.params.id }}).then(function(rowTeachers){
      res.redirect('/teachers')
    }).catch((err) => {
      res.send(err);
      })
})

app.get('/teachers/delete/:id', function(req, res) {
  db.Teacher.destroy({
    where : {id:req.params.id}
  }).then(function () {
    res.redirect('/teachers')
  })
})

//==============================================

app.get('/subjects', function(req, res) {
  db.Subject.findAll({ include : [db.Teacher] }).then(function (rows) {
    db.Student.findAll().then(function (rowStudents) {
      res.render('subject',{rowSubjects : rows, rowStudents : rowStudents});
    })
  })
})

app.get('/subjects/:id/enrolledstudents', function(req, res) {
    db.Subject.findById(req.params.id).then(function(hasil) {
        hasil.getStudents().then(function (data) {
          res.render('allStudentSubject', {hasil,data});
        })
    })
})

// app.get('/subjects/:id/givescore', function (req, res) {
//   db.StudentSubject.findById(req.params.id).then(function(rows) {
//     rows.getStudents
//     res.render('givesScore', {rows : rows})
//   })
// })

app.get('/subjects/:id/givescore',(req,res)=>{
  db.SubjectStudent.findById(req.params.id).then((rows)=>{
    rows.getStudent().then((dataStudent)=>{
      rows.getSubject().then((dataSubject)=>{
        res.render('givesScore',{dataStudent,dataSubject,rows})
      })
    })
  })
})

app.post('/subjects/:id/givescore',(req,res)=>{
  db.SubjectStudent.findById(req.params.id).then((data)=>{
    data.update({Score:req.body.Score}).then((result)=>{
      res.redirect(`/subjects/${data.SubjectId}/enrolledstudents`)
    })
  })
})

// app.post('/subjects/:id/givescore', function(req, res) {
//   db.StudentSubject.findById(req.params.id).then(function(rows) {
//     rows.update({Score : req.body.score}).then(function() {
//       res.redirect(`/subjects/${rows.SubjectId}/enrolledstudents`)
//     })
//   })
// })

//==============================================

app.get('/students', function(req, res) {
  db.Student.findAll().then(function (rowStudents) {
    res.render('student',{rowStudents});
  })
})

app.get('/students/add', function(req, res) {
  res.render('formStudent')
})

app.get('/students/:id/addsubject', function(req ,res) {
  db.Student.findById(req.params.id).then(function(rowStudents) {
    db.Subject.findAll(req.body).then(function(rowSubjects) {
      res.render('addsubject', {rowStudents: rowStudents, rowSubjects : rowSubjects})
    })
  })
})


app.post('/students/add', function(req, res) {
  db.Student.create(req.body).then(function () {
    res.redirect('/students')
  }).catch(function(err){
    console.log(err);
  })
})

app.post('/students/:id/addsubject', function(req, res) {
  db.StudentSubject.create(req.body).then(function () {
    res.redirect('/students')
  }).catch(function(err){
    console.log(err);
  })
})


app.get('/students/edit/:id', function(req, res) {
  db.Student.findById(req.params.id).then(function(rowStudents) {
    res.render('editStudents', {rowStudents: [rowStudents] })
  })
})

app.post('/students/edit/:id', function(req, res) {
  let data = {
    id    : req.params.id,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email  : req.body.email
  };
  db.Student.update(data, {
    where : { id: req.params.id }
  }).then(function() {
    res.redirect('/students')
  })
})

app.get('/students/delete/:id', function(req, res) {
  db.Student.destroy({
    where : {id:req.params.id}
  }).then(function () {
    res.redirect('/students')
  })
})

//==============================================

app.get('/', function(req, res) {
  res.send('Hello World of Programming !')
})

app.listen(3000, function () {
  db.sequelize.sync();
  console.log('Looking for me ? 3000');
})
