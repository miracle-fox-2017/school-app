const express = require('express')
const bodyParser = require('body-parser')

const app = express()
//load css
app.use(express.static(__dirname + '/views'))
//require ejs
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// helper
app.locals.getScore = require('./helpers/subject-getscore');

//routers
let index = require('./routers/index')
let teachers = require('./routers/teachers')
let subjects = require('./routers/subjects')
let students = require('./routers/students')

app.use('/', index)
app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)


app.listen(3000, err =>{
  if(!err){
    console.log('serv is listen on port:3000');
  }
})
