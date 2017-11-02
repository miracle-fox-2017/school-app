const express = require('express');
const router = express.Router();
const Model = require('./../models')

router.get('/', function (req, res) {
    Model.Student.findAll().then((dataStudents) => {
        res.render('student', { dataStudents: dataStudents, pageTitle: "Students" })
    }).catch((reason) => {
        res.send(reason)
    })

})

router.get('/add', function (req, res) {
    res.render('student-add', { pageTitle: "Students-add", message: '' })
})

router.post('/add', function (req, res) {
    Model.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }).then(() => {
        res.redirect('../students')
    }).catch((reason) => {
        res.render('student-add', { pageTitle: "Students-add", message: reason.errors[0].type + ' : ' + reason.errors[0].message })
    })
})

router.get('/edit/:id', function (req, res) {
    Model.Student.findById(req.params.id).then((dataStudent) => {
        res.render('student-edit', { dataStudent: dataStudent, pageTitle: 'Edit Student', message: '' })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/edit/:id', function (req, res) {
    Model.Student.update({
        id : req.params.id,        
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('../../students')
        }).catch((reason) => {
            Model.Student.findById(req.params.id).then((dataStudent) => {
                res.render('student-edit', { dataStudent: dataStudent, pageTitle: 'Edit Student', message: reason.errors[0].type + ' : ' + reason.errors[0].message })
            })
        })
})

router.get('/delete/:id', function (req, res) {
    Model.Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect("../../students")
    }).catch((reason) => {
        res.send(reason)
    })

})


module.exports = router