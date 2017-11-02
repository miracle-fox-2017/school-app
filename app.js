const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
app.use(urlencodedParser)

const index = require('./routes/index.js')
app.use('/', index)


const teachers = require('./routes/teachers.js')
app.use('/teachers', teachers)

const subjects = require('./routes/subjects.js')
app.use('/subjects', subjects)

const students = require('./routes/students.js')
app.use('/students', students)

app.listen(3000)
