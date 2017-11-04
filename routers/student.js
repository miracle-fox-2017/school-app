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

router.get('/delete/:id', ( req, res ) => {
    db.student.destroy( { where : { id : req.params.id } } ).then( ( dataStudents ) => {
        res.redirect('/students');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router