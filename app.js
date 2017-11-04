let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views');
app.set('view engine', 'ejs');

let db = require('./models');


const homeRouter = require('./routers/index.js');
app.use('/', homeRouter);

const subjectRouter = require('./routers/subject.js');
app.use('/subjects',subjectRouter);

const teacherRouter = require('./routers/teacher.js');
app.use('/teacher', teacherRouter);

const studentRouter = require('./routers/student');
app.use('/students', studentRouter);


app.listen(3000, function() {
  db.sequelize.sync();
});
