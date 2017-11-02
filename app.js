const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser');

// Router
const indexRoute = require('./routes/index-route');
const teacherRoute = require('./routes/teacher-route');
const subjectRoute = require('./routes/subject-route');
const studentRoute = require('./routes/student-route');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute);
app.use('/teachers', teacherRoute);
app.use('/subjects', subjectRoute);
app.use('/students', studentRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})