const express = require('express');
const router = express.Router();
const Model = require('./../models')

router.get('/', function (req, res) {
    Model.Student.findAll({
        order: [
            ['first_name', 'ASC']
        ]
    }).then((dataStudents) => {
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
        id: req.params.id,
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

//Kerjain lagi yaaaa...
router.get('/:id/addsubject', function (req, res) {
    Promise.all([
        Model.Student.findById(req.params.id),
        Model.Subject.findAll()
    ]).then((result) => {
        res.render('student-subject', { dataStudent: result[0], dataSubject: result[1], pageTitle: "Add Data Subject" })
    })
})
router.post('/:id/addsubject', function (req, res) {
    Model.StudentSubject.create({
        idStudent: req.params.id,
        idSubject: req.body.idSubject
    }).then((result) => {
        res.redirect('../../students')
    })
})

router.get('/delete/:id', function (req, res) {
    Promise.all([
        Model.Student.destroy({
            where: {
                id: req.params.id
            }
        }),
        Model.StudentSubject.destroy({
            where: {
                idStudent: req.params.id
            }
        })

    ]).then(() => {
        res.redirect('../../students')
    }).catch((reason) => {
        res.render(reason)
    })

})


module.exports = router