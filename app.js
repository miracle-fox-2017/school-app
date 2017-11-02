const express=require('express');
const app = express();
const bodyParser =require('body-parser')
// const db = require('./models');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')

// //require FILE router
const teacher = require('./routers/teacher.js')
const subject = require('./routers/subject')
const student = require('./routers/student')

app.get('/',(req,res)=>{
  res.send('Welcome to HOME')
})

//TEACHER====================================
app.use('/teachers', teacher);


//SUBJECT====================================
app.use('/subjects', subject)

//STUDENT====================================
app.use('/students', student)



app.listen(3000)
