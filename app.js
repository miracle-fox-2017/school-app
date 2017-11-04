const express = require('express');
const db = require('./models');
const app = express();
const Teacher = require('./router/teacher');
const Subject = require('./router/subject')
const Student = require('./router/student');
const bodyParser = require('body-parser');


app.set('views','./views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get('/',function(req,res) {
  res.send('ini home')
})

app.use('/',Teacher)
app.use('/',Subject)
app.use('/',Student)

app.listen(3000,function() {
  console.log('jos!!!!!!');
})
