const express = require('express');
const router = express.Router();
const db = require('../models')



router.get('/', (req,res)=>{
  db.Teacher.findAll().then((dataTeachers) => {
    res.render('teachers',{dataTeachers})
  }).catch((err)=>{
    console.log(err);
    })

})

router.get('/add', (req, res) => {
    res.render('addteachers', { error: null });
});

router.post('/add', (req, res) => {
    db.teacher.create(req.body).then((user) => {
        res.redirect('/teachers');
    }).catch((err) => {
        res.render('addteachers', { error: err.errors[0].message });
    })

});

router.get('/edit/:id', (req, res) => {
    db.teacher.findById(req.params.id).then((dataTeachers) => {
        res.render('editteacher', { dataTeachers, error: null });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    db.teacher.update(req.body, { where: { id: req.params.id } }).then((dataTeachers) => {
        res.redirect('/teachers');
    }).catch((err) => {
        db.student.findById(req.params.id).then((dataTeachers) => {
            res.render('editteacher', { dataTeachers, error: err.errors[0].message });
        })
    });
});

router.get('/delete/:id', (req, res) => {
    db.teacher.destroy({ where: { id: req.params.id } }).then((dataTeachers) => {
        res.redirect('/teachers');
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = router
