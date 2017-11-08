const express = require('express');
const router = express.Router();
const Model = require('../models/');

router.get('/', function (req, res) {
  Model.Student.findAll({order: [['first_name', 'ASC']]})
  .then(dataStudent=>{
    let dataS = {
      title : "Students",
      rows : dataStudent

    }
    res.render('students', dataS)
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('students-add', {title : 'Student Add'} )
})

router.post('/add', (req, res)=>{
  Model.Student.create(req.body).then(dataStudent=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  Model.Student.findById(req.params.id).then(dataStudent=>{
    let dataS= {
      rows : dataStudent,
      title : 'Student Edit'
    }
    res.render('students-edit', dataS)
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Student.update(req.body, {
    where :{id : req.body.id}
  }).then(dataStudent=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  Model.Student.destroy({
    where : {id : req.params.id}
  }).then(dataStudent =>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/:id/addsubject', (req, res)=>{
  Model.Student.findById(req.params.id).then(dataStudent=>{
    Model.Subject.findAll().then(dataSubject=>{
      let dataS= {
        rows : dataStudent,
        data : dataSubject,
        title : 'Student Add Subject'
      }
      res.render('students-subject-add', dataS)
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/:id/addsubject', (req, res)=>{
  Model.StudentSubject.create(req.body).then(dataStuSub=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
