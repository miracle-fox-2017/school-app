const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const index = require('./routers/index')
app.use('/', index)

const teachers = require('./routers/teachers')
app.use('/teachers', teachers)

const subjects = require('./routers/subjects')
app.use('/subjects', subjects)

const students = require('./routers/students')
app.use('/students', students)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})