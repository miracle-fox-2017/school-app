const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let index = require('./routes/index')
let teacher = require('./routes/teacher')
let subject = require('./routes/subject')

app.use('/', index)
app.use('/teachers', teacher)
app.use('/subjects', subject)

app.listen(3000)