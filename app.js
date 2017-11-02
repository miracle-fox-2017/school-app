const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');

const teacher = require('./router/teacher')

app.use('/teachers', teacher)

app.listen(3000, function () {
  db.sequelize.sync();
  console.log('Example app listening on port 3000!')
})