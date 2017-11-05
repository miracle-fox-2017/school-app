const express = require('express');
const router = express.Router();
const Model = require('./../models')

router.get('/', function (req, res) {
    Model.Subject.findAll({
        include: [{
            model: Model.Teacher
        }]
    }).then((dataSubjects) => {

        res.render('subject', { dataSubjects: dataSubjects, pageTitle: 'Subject' })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/add', function (req, res) {
    res.render('subject-add', { pageTitle: "Add Data Subject" })
})

router.post('/add', function (req, res) {
    Model.Subject.create({
        subject_name: req.body.subject_name
    }).then(() => {
        res.redirect('../subjects')
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/edit/:id', function (req, res) {
    Model.Subject.findById(req.params.id).then((dataSubject) => {
        res.render('subject-edit', { dataSubject: dataSubject, pageTitle: "Edit Subject" })
    })

})

router.post('/edit/:id', function (req, res) {
    Model.Subject.update({
        subject_name: req.body.subject_name
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('../../subjects')
        }).catch((reason) => {
            res.send(reason)
        })
})
//kerjain cuuy
// router.get('/:id/enrolledstudents', function (req, res) {
//     Model.StudentSubject.findAll({
//         include: [Model.Student, Model.Subject], where:
//         {
//             idSubject: req.params.id
//         }
//     }).then((result) => {
//         console.log(result)
//         //res.render('enrolled-students', { dataStudentSubject: result, pageTitle: 'Enrolled Student' })
//     })
// })

router.get('/delete/:id', function (req, res) {
    Model.Subject.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('../../subjects')
    }).catch((reason) => {
        res.send(reason)
    })
})

module.exports = router