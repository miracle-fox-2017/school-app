const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Teacher = require('./router/teacher.js')
const Subject = require('./router/subject.js')
const Student = require('./router/student.js')

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs')


app.use('/teachers', Teacher);
app.use('/subjects', Subject);
app.use('/students', Student);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})