const express = require('express');
const bodyParser = require('body-parser');
// const

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

const index = require('./routers/index.js');
const teacher = require('./routers/teacher.js');
const subject = require('./routers/subject.js');
const student = require('./routers/student.js');

app.use('/',index);
app.use('/teacher',teacher);
app.use('/subject',subject);
app.use('/student',student);


app.listen(3000,function () {
  console.log('Running');
})
