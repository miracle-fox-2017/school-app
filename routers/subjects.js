const express = require('express')
const router = express.Router()
const model = require('../models');
const scoreLetter = require('../helpers/scoreLetter');

router.get('/', function (req, res) {
  model.Subject.findAll(
    {
      order: [["subject_name", "ASC" ]]
    })
    .then(dataSubjects=>{
      let newDataSubjects = dataSubjects.map(subject=>{
        return new Promise(function(resolve, reject) {
          subject.getTeachers()
            .then(teachers=>{
              subject.teacherName = teachers
              resolve(subject)
            })
        });
      })
      Promise.all(newDataSubjects)
        .then(allSubjectTeacher=>{
          res.render('subjects', {dataSubjects:allSubjectTeacher,error:'',pageTitle:'Subjects'})
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(err)
      })
})

router.post('/add', (req, res)=>{
  let input = req.body
  console.log(input);
  model.Subject.create(
    {
      subject_name: input.subject_name
    })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          let error = err.message.split(',');
          res.render('subjects', {error:error[0]})
        })
})

router.get('/edit/:id', (req, res)=>{
  model.Subject.findById(req.params.id)
    .then(dataSubject=>{
      res.render('editSubject', {dataSubject:dataSubject,pageTitle:'Edit Subject'})
    })
    .catch(err=>{
        res.send(err)
      })
})

router.post('/edit/:id', (req, res)=>{
   let edit = req.body
   model.Subject.update(
     {
       subject_name: edit.subject_name,
       id: req.params.id
     },
     {
       where:{ id: req.params.id}
     })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          res.send(err)
        })
})

router.get('/delete/:id', (req, res)=>{
   model.Subject.destroy(
     {
       where: {id: req.params.id}
     })
      .then(()=>{
        res.redirect('/subjects')
      })
      .catch(err=>{
          res.send(err)
        })
})

router.get('/:id/enrolledstudents', (req, res) => {
  model.Subject.findAll(
  {
    where: {
      id: req.params.id
    },
    include: [
    {
      model: model.Student,
      through: {
        where: {
          SubjectId: req.params.id
        },
        attributes: ['id','score']
      }
    }],
    order: [
       [ model.Student, 'first_name', 'ASC' ]
    ]
  })
  .then(dataSubjects =>{
    // res.send(dataSubjects)
    res.render('enrolledStudents',
       {
         allDataStudents:dataSubjects,
         pageTitle:'Enrolled Students',
         scoreLetter: scoreLetter
       })
  })
  .catch(err=>{
    console.log(err);
    res.send(err)
  })
})

 // router.get('/:id/enrolledstudents', (req, res)=>{
 //   model.Subject.findById(req.params.id)
 //    .then(dataSubject=>{
 //      // User.findAll({
 //      //   include: [{
 //      //     model: Project,
 //      //     through: {
 //      //       attributes: ['createdAt', 'startedAt', 'finishedAt'],
 //      //       where: {completed: true}
 //      //     }
 //      //   }]
 //      // });
 //      model.Student_Subject.findAll(
 //        {
 //          include: ['Student'],
 //          order: [
 //            [ 'Student', 'first_name', 'ASC' ]
 //          ]
 //        })
 //        .then(dataStudentSubject=>{
 //          // res.send(dataStudentSubject)
 //          res.render('enrolledStudents',
 //            {
 //              dataSubject:dataSubject,
 //              allDataStudents:dataStudentSubject
 //            })
 //        })
 //    })
 //    .catch(err=>{
 //      console.log(err);
 //      res.send(err)
 //    })
 // })

router.get('/:id/givescore', (req, res)=>{
   model.Student_Subject.findById(req.params.id)
    .then(studentsubjet=>{
      Promise.all(
        [
          model.Student.findById(studentsubjet.StudentId),
          model.Subject.findById(studentsubjet.SubjectId)
        ])
         .then(allData =>{
          //  res.send(studentsubjet)
           res.render('giveScore',
           {
             studentsubjet:studentsubjet,
             dataStudent:allData[0],
             dataSubject:allData[1],
             pageTitle:'Give Score'
           })
         })
    })
    .catch(err=>{
        console.log(err);
        res.send(err)
    })
})

router.post('/:id/givescore', (req, res)=>{
  //  res.send(req.params.id)
   model.Student_Subject.update(
     {
       score: req.body.score
     },
     {
       where:{ id: req.params.id}
     })
      .then(()=>{
        res.redirect(`/subjects/${req.body.SubjectId}/enrolledstudents`)
      })
      .catch(err=>{
        console.log(err);
        res.send(err)
      })
})

module.exports = router
