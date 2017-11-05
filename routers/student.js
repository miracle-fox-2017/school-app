const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.student.findAll( { order:[['id','ASC']] } ).then((dataStudents) => {
        res.render('student', { dataStudents });
    }).catch((err) => {
        res.send(err);
    });
});


//tambah studens
router.get('/add', (req, res) => {
    res.render('addstudent',{ error:null });
});

router.post('/add', (req, res) => {
    db.student.create(req.body).then((user) => {
        res.redirect('/students');
    }).catch((err)=>{
        res.render('addstudent',{ error : err.errors[0].message });
    })
    
});

//edit student
router.get('/edit/:id', (req, res) => {
    db.student.findById(req.params.id).then((dataStudents) => {
        res.render('editstudent', { dataStudents,error: null });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    db.student.update(req.body,{where:{id:req.params.id}}).then((dataStudents) => {
        res.redirect('/students');
    }).catch((err) => {
        db.student.findById(req.params.id).then((dataStudents) => {
            res.render('editstudent', { dataStudents, error: err.errors[0].message });
        })
    });
});

//tambah subject
router.get('/:id/addsubject', (req, res) => {
    db.student.findById(req.params.id).then((dataStudents) => {
        db.subject.findAll().then((dataSubject) => {
            res.render('addstudentwithsubject', { dataStudents, dataSubject });
        }).catch((err) => {
            res.send(err);
        });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/:id/addsubject', (req, res) => {
    let Obj = {
        studentId : req.body.studentId,
        subjectId : req.body.subjectId 
    };
    db.studentswithsubject.create(Obj).then((user) => {
        res.redirect('/students');
    }).catch((err) => {
        res.send(err);
    });
});

///hapus student
router.get('/delete/:id', ( req, res ) => {
    db.student.destroy( { where : { id : req.params.id } } ).then( ( dataStudents ) => {
        res.redirect('/students');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router