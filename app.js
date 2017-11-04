const express = require('express');
const bodyParser = require('body-parser')
const Teachers = require('./routers/teachersRouter');
const Subjects = require('./routers/subjectsRouter');
const Students = require('./routers/studentsRouter');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/teachers', Teachers);
app.use('/subjects', Subjects);
app.use('/students', Students);


app.get('/', (req, res) => {
  res.render('home');
})

app.listen(3000, function() {
  console.log("IT WORKS!!");
});