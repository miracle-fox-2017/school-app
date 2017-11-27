const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./models');

const teachers = require('./routes/teacher');
const subjects = require('./routes/subject');
const students = require('./routes/student');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)


app.listen(3000, function() {
  db.sequelize.sync();
  console.log('brrrruuuummm jalan di 3k brooo');
});
