const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) =>{
  model.Subject.findAll().then(subjects => {
    let newData = subjects.map(subject => {
      return new Promise((resolve, reject) => {
        subject.getTeachers().then(dataTeachers => {
          console.log(dataTeachers);
        })

      })
    })
    //res.send(subjects)
    //res.render('subjects/subjects',{dataSubjects:dataSubjects})

  })
})







module.exports = router;
