const express = require('express');
const router = express.Router();
const Model = require('../models')


router.get('/', function (req, res) {
    Model.Teacher.findAll({
        include: [Model.Subject]
    }, {
            order: [
                ['first_name', 'ASC']
            ]
        }).then((dataTeachers) => {
            // console.log(dataTeachers.Subject)
            res.render('teacher', { dataTeachers: dataTeachers, pageTitle: "Teacher" })
        }).catch((reason) => {
            res.send(reason)
        })
})

router.get('/add', function (req, res) {
    Model.Subject.findAll().then((dataSubjects) => {
        res.render('teacher-add', { dataSubjects: dataSubjects, pageTitle: "Add Data Teacher", message: '' })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/add', function (req, res) {
    Model.Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        idSubject: req.body.idSubject
    }).then(() => {
        res.redirect('../../teachers')
    }).catch((reason) => {
        Model.Subject.findAll().then((dataSubjects) => {
            res.render('teacher-add', { dataSubjects: dataSubjects, pageTitle: "Add Data Teacher", message: reason.errors[0].type + ' : ' + reason.errors[0].message })
        })
    })
})

router.get('/edit/:id', function (req, res) {
    Promise.all([
        Model.Teacher.findById(req.params.id),
        Model.Subject.findAll()
    ]).then((result) => {
        res.render('teacher-edit', { dataTeacher: result[0], dataSubjects: result[1], pageTitle: 'Edit Data Teacher', message: '' })

    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/edit/:id', function (req, res) {
    // console.log(req.body)
    Model.Teacher.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        idSubject: req.body.idSubject
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('../../teachers')
        }).catch((reason) => {
            Promise.all([
                Model.Teacher.findById(req.params.id),
                Model.Subject.findAll()
            ]).then((result) => {
                res.render('teacher-edit', { dataTeacher: result[0], dataSubjects: result[1], pageTitle: 'Edit Data Teacher', message: reason.errors[0].type + ' : ' + reason.errors[0].message })

            })
        })
})

router.get('/delete/:id', function (req, res) {
    Model.Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('../../teachers')
    }).catch((reason) => {
        res.send(reason)
    })
})

module.exports = router