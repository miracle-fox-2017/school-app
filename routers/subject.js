const express = require('express');
const router = express.Router();
const db = require('../models');
const score = require('../helpers/score');


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
    db.studentswithsubject.findAll({ where: { subjectId: req.params.id },order: [['id', 'ASC']], include: [db.subject,db.student] }).then((dataSubjects) => {
        // res.send(dataSubjects);
        dataSubjects.forEach(function(element) {
            element.score = score(element.score);
        });

        res.send(dataSubjects);

        // res.render('enrolled',{ dataSubjects });

    }).catch((err) => {
        res.send(err);
    });
});

//score
router.get('/:id/givescore', (req, res) => {
    db.studentswithsubject.find({ where: { id: req.params.id }, order: [['id', 'ASC']], include: [db.student, db.subject] }).then((dataSubjects) => {
        res.render('givescore', { dataSubjects });
        // res.send(dataSubjects);
    }).catch((err) => {
        res.send(err);
    });
    // res.render('givescore', { error: null });
});

router.post('/:id/givescore', (req, res) => {
    db.studentswithsubject.update(req.body, { where: { id: req.params.id } }).then((set) => {
        res.redirect('/subjects');
    })
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