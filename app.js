// require libraries
const express = require('express')
const bodyParser = require('body-parser')

// invoke express
const app = express()

// set view engine
app.set('view engine', 'ejs')

// use encoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require routers
const index = require('./routers/index')
const teacher = require('./routers/teacher')
const subject = require('./routers/subject')
const student = require('./routers/student')

// website routers
app.use('/', index)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)

// port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
