const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', function (req, res){
  db.Subject.findAll({include: [db.Teacher]}).then(function (subjData){
    // console.log(subjData[0].Teachers);
    res.render('subject',{subjData:subjData})
    // res.send(subjData)
  }).catch(function(err){
      console.log(err);
  })
})

router.get('/:id/enrolledstudents', function(req, res){
  db.Subject.findById(req.params.id).then(function(subjData){
    subjData.getStudents().then(function(studData){
      // res.send(studData)
      res.render('subjectEnroll', {
        studData:studData,
        subjData:subjData
      })
    }).catch(function(err){
      console.log(err);
    })
  })
})

router.get('/:id/givescore', function(req, res){
  db.SubjectStudent.findById(req.params.id).then(function(conjData){
    // res.send(conjData)
    res.render('subjectGivescore', {conjData:conjData})
  })
  // res.send('kasihiakudongbangjanganjahatjahatlahsamaadekbangkankitaprenddarikecilsukamainbarengsampemaghribpulangpulangdimarahinemaktrusnangistereaktereaksampetetanggaterdiamlucudeh')
})

router.post('/:id/givescore', function(req, res){
  db.SubjectStudent.findById(req.params.id).then(function(conjData){
    // res.send(conjData)
    conjData.update({
      Score: req.body.Score
      
    }).then(function(berhasil){
      // res.send('berhasil')
      res.redirect(`/subjects/${conjData.SubjectId}/enrolledstudents`)
    })
  })
})

module.exports = router