const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const index = require('./routers/index');
const teachers = require('./routers/teachers');
const subjects = require('./routers/subjects');
const students = require('./routers/students');

app.use('/', index)
app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})
