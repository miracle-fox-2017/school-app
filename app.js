const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set the view engine to ejs
app.set('views', './views');
app.set('view engine', 'ejs');

let index = require('./routes');
app.use('/', index);

let subject = require('./routes/subjects');
app.use('/subjects', subject);

let teacher = require('./routes/teachers');
app.use('/teachers', teacher);

let student = require('./routes/students');
app.use('/students', student);

app.listen(3000);
