const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) =>{
  model.Subject.findAll().then(subjects => {
    let newData = subjects.map(subject => {
      return new Promise((resolve, reject) => {
        subject.getTeachers().then(dataTeachers => {
          let arrNama = []
          dataTeachers.forEach(item => {
            if(subject.id == item.SubjectId){
              arrNama.push(item.first_name)
            }
          })
          subject.Teachers = arrNama
          resolve(subject)
        })
      })
    })
    Promise.all(newData).then(subjects_teachers => {
      //console.log(subjects_teachers[3].Teachers);
      //res.send(subjects_teachers)
      res.render('subjects/subjects',{dataSubjects:subjects_teachers, title:'subjects'})
    })
  })
})


router.get('/add', (req, res) => {
  res.render('subjects/add',{title:'add-subject'})
})

router.post('/add', (req, res) => {
  model.Subject.create(
    {
      subject_name:req.body.subject_name
    }
  )
  .then(() => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Subject.findOne({where:{id:req.params.id}}).then(dataSubjects => {
      res.render('subjects/edit', {dataSubjects:dataSubjects, title:'edit-subjects'})
  })
})

router.post('/edit/:id', (req, res) => {
  model.Subject.update(
    {
      subject_name:req.body.subject_name
    },{where:{id:req.params.id}}
  )
  .then(() => {
    res.redirect('/subjects')
  })
})


router.get('/delete/:id', (req, res) => {
  model.Subject.destroy({where:{id:req.params.id}})
  .then(() => {
    res.redirect('/subjects')
  })
})



router.get('/:id/enrolledStudent', (req, res) => {
  //console.log(req.params.id, '--------------');
  model.StudentSubject.findAll({
    where:{SubjectId:req.params.id},
    include:[
      {model:model.Student}
    ],
    order: [ [ { model: model.Student, as: 'Student' }, 'first_name', 'ASC'] ],
  })
  .then(dataSubject => {
    model.Subject.findById(req.params.id).then(rows =>{
       res.render('subjects/enrolledstudents', {dataSubject:dataSubject, subject_name:rows.subject_name, title:'enrolledstudents'})
    })
  })
})


router.get('/:id/givescores', (req, res) => {
  model.StudentSubject.findOne({
    where:{id:req.params.id},
    include:[
      {model:model.Student},
      {model:model.Subject}
    ]
  })
  .then(data => {
    //res.send(data)
    res.render('subjects/scoring', {data:data, title:'scoring'})
  })
})

router.post('/:id/givescores', (req, res) => {

  model.StudentSubject.update(
    {score: req.body.score},
    {where:{StudentId:req.body.StudentId, SubjectId:req.body.SubjectId}}
  )
  .then(() => {

    res.redirect(`/subjects/${req.body.SubjectId}/enrolledStudent`)
  })
})




module.exports = router;
