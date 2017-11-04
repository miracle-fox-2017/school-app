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
  db.Teacher.findAll().then(function (rowTeachers) {
    res.render('teacher',{rowTeachers});
  })
})

//==============================================

app.get('/subjects', function(req, res) {
  db.Subjects.findAll().then(function (rowSubjects) {
    res.render('subject',{rowSubjects});
  })
})

//==============================================

app.get('/students', function(req, res) {
  db.Students.findAll().then(function (rowStudents) {
    res.render('student',{rowStudents});
  })
})

app.get('/students/add', function(req, res) {
  res.render('formStudent')
})

app.post('/students/add', function(req, res) {
  db.Students.create(req.body).then(function (berhasil) {
    res.redirect('/students')
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/students/edit/:id', function(req, res) {
  db.Students.findById(req.params.id).then(function(rowStudents) {
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
  db.Students.update(data, {
    where : { id: req.params.id }
  }).then(function() {
    res.redirect('/students')
  })
})



app.get('/students/delete/:id', function(req, res) {
  db.Students.destroy({
    where : {id:req.params.id}
  }).then(function () {
    res.redirect('/students')
  })
})

// /public static upsert(values: Object, options: Object): Promise<created>
//==============================================

app.get('/', function(req, res) {
  res.send('Hello World of Programming !')
})

app.listen(3000, function () {
  db.sequelize.sync();
  console.log('Looking for me ? 3000');
})
