const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

//body parser
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

//routers
let teachers = require('./routers/teachers')
app.use('/teachers', teachers)

let subjects = require('./routers/subjects')
app.use('/subjects', subjects)

let students = require('./routers/students')
app.use('/students', students)

app.get('/', (req, res)=>{
  res.render('home',{title:'Home'})
})

//listen 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})