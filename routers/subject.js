const express = require('express');
const router = express.Router();
const db = require('../models')



// router.get('/', (req,res)=>{
//   db.Subject.findAll().then((dataSubjects) => {
//     res.render('subjects',{dataSubjects});
//   }).catch((err)=>{
//     console.log(err);
//     })
// })
router.get('/', (req,res) => {
  db.Subject.findAll({
    include: [db.Teacher]
  }).then((results) => {
    res.render('subjects', {results});
  }).catch((err) => {
  })
});

router.get('/add', (req, res) => {
    res.render('addsubject', { error: null });
});

router.post('/add', (req, res) => {
    db.Subject.create(req.body).then((user) => {
        res.redirect('/subjects');
    }).catch((err) => {
        res.render('addsubject', { error: err.errors[0].message });
    })

});

router.get('/edit/:id', (req, res) => {
    db.Subject.findById(req.params.id).then((dataSubjects) => {
        res.render('editsubject', { dataSubjects, error: null });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    db.Subject.update(req.body, { where: { id: req.params.id } }).then((dataSubjects) => {
        res.redirect('/subjects');
    }).catch((err) => {
        db.Student.findById(req.params.id).then((dataSubjects) => {
            res.render('editsubject', { dataSubjects, error: err.errors[0].message });
        })
    });
});

router.get('/delete/:id', (req, res) => {
    db.subject.destroy({ where: { id: req.params.id } }).then((dataSubjects) => {
        res.redirect('/subjects');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router
