const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','ejs');

// const index = require('./routers/index');
app.get('/', function(req,res){
    res.render('index');
});

const subject = require('./routers/subject');
app.use('/subjects', subject);

const teacher = require('./routers/teacher');
app.use('/teachers', teacher);

const student = require('./routers/student');
app.use('/students', student);

app.listen('3000',function(){
    console.log('go');
});