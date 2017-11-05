const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
  model.Subject.findAll({include: [model.Teacher]}).then((subject) => {
    // res.send(subject)

    res.render('subject', {subject: subject})
  })
})

router.get('/add', (req, res) => {
  res.render('subjectadd')
})

router.post('/add', (req, res) => {
  model.Subject.create({subject_name: req.body.subject_name}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', (req, res) => {
  model.Subject.destroy({where:{id:req.params.id}}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Subject.findOne({where:{id:req.params.id}}).then((subject) => {
    res.render('subjectedit', {subject:subject})
  })
})

router.post('/edit/:id', (req, res) => {
  model.Subject.update({subject_name: req.body.subject_name}, {where: {id:req.params.id}}).then(() => {
    res.redirect('/subjects')
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  model.StudentSubject.findAll({where: {SubjectId: req.params.id}}).then((studentssubjects) => {
    var arrPromise = studentssubjects.map((studentsubject) => {
      return new Promise((resolve, reject) => {
        studentsubject.getStudent().then((student) => {
          if(student == null) {
            studentsubject.full_name = ""
          }
          else {
            studentsubject.full_name = student.first_name + ' ' + student.last_name
          }
          resolve(studentsubject)
        })
      })
    })

    Promise.all(arrPromise).then((hasil) => {
      // res.send(hasil)
      hasil[0].getSubject().then((subject) => {
        hasil.sort((a, b) => {
          if(a.full_name > b.full_name) {
            return 1
          }
          else {
            return -1
          }
        })
        // res.send(hasil)
        res.render('subjectenrolled', {data: hasil, subject: subject})
      })
    })
  })
})

router.get('/:idsubject/givescore/:idstudent', (req, res) => {
  model.StudentSubject.findOne({where:{SubjectId: req.params.idsubject, StudentId: req.params.idstudent}}).then((studentssubjects) => {
    studentssubjects.getSubject().then((subject) => {
      studentssubjects.getStudent().then((student) => {
        res.render('subjectgivescore', {subject: subject, student: student})
      })
    })
  })
})

router.post('/:idsubject/givescore/:idstudent', (req, res) => {
  model.StudentSubject.update({score: req.body.score}, {where: {SubjectId: req.params.idsubject, StudentId: req.params.idstudent}}).then(() => {
    res.redirect('/subjects')
  })
})


module.exports = router
