const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const teacher = require('./router/teacher')
const subject = require('./router/subject')
const student = require('./router/student')
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/',teacher)
app.use('/',subject)
app.use('/',student)






app.listen(3000,function(){
 })
