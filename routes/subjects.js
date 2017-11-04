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
      res.render('subjects/subjects',{dataSubjects:subjects_teachers})
    })
  })
})


router.get('/add', (req, res) => {
  res.render('subjects/add')
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
      res.render('subjects/edit', {dataSubjects:dataSubjects})
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
  model.Subject.findOne({
    where:{id:req.params.id},
    include:[
      {model:model.Student}
    ]
  })
  .then(dataSubject => {
   res.render('subjects/enrolledstudents', {dataSubject:dataSubject})
  })
})


// router.get('/:id/enrolledStudent', (req, res) => {
//   model.Subject.findOne({where:{id:req.params.id}}).then(dataSubject => {
//       model.Student.findAll().then(dataStudents => {
//         model.StudentSubject.findAll().then(dataStudentSubjects => {
//           let newArr = []
//         for(let i = 0; i < dataStudents.length; i++){
//
//           dataStudentSubjects.forEach(item => {
//             if(dataStudents[i].id == item.StudentId && dataSubject.id == item.SubjectId){
//               //dataSubject.students = dataStudents[i].first_name
//               newArr.push(dataStudents[i].first_name)
//             }
//           })
//         }
//         dataSubject.arrNama = newArr
//         console.log(dataSubject);
//         //res.send(dataSubject.students)
//         res.render('subjects/enrolledstudents', {dataSubject:dataSubject})
//       })
//     })
//
//   })
//
// })




module.exports = router;
