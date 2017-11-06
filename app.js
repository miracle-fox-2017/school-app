const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session');
const teacher = require('./routers/teacher')
const subject = require('./routers/subject')
const student = require('./routers/student')
const index = require('./routers/index')


app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/index', index)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
