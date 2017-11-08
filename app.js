const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const index = require('./routers/index');
const teacher = require('./routers/teacher');
const subject = require('./routers/subject');
const student = require('./routers/student');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use('/', index)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)


app.listen(3000, function() {
  console.log("Sedang Berjalan .... !!!!");
});
