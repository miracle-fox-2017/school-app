const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', (req, res) => {
    db.subject.findAll({ include: [db.teacher]}).then((dataSubjects) => {
        res.render('subject', { dataSubjects });
    }).catch((err)=>{
        res.send(err);
    });    
});

//tambah subject
router.get('/add', (req, res) => {
    res.render('addsubject', { error: null });
});

router.post('/add', (req, res) => {
    db.subject.create(req.body).then((user) => {
        res.redirect('/subjects');
    }).catch((err) => {
        res.render('addsubject', { error: err.errors[0].message });
    })

});

//edit subject
router.get('/edit/:id', (req, res) => {
    db.subject.findById(req.params.id).then((dataSubjects) => {
        res.render('editsubject', { dataSubjects, error: null });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    db.subject.update(req.body, { where: { id: req.params.id } }).then((dataSubjects) => {
        res.redirect('/subjects');
    }).catch((err) => {
        db.student.findById(req.params.id).then((dataSubjects) => {
            res.render('editsubject', { dataSubjects, error: err.errors[0].message });
        })
    });
});

//subject join student
router.get('/:id/enrolledstudents', (req, res) => {
    db.studentswithsubject.findAll({ order: [['id', 'ASC']], include: [db.subject,db.student] }).then((dataSubjects) => {
        res.send(dataSubjects);
    }).catch((err) => {
        res.send(err);
    });
});

//hapus subject
router.get('/delete/:id', (req, res) => {
    db.subject.destroy({ where: { id: req.params.id } }).then((dataSubjects) => {
        res.redirect('/subjects');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router