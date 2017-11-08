const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const index = require('./routers/index');
const teachers = require('./routers/teachers');
const subjects = require('./routers/subjects');
const students = require('./routers/students');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//ROUTE
app.use('/', index);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
