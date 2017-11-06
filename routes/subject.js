const express = require('express');
const router = express.Router();
const Model = require('./../models')

router.get('/', function (req, res) {
    Model.Subject.findAll().then((dataSubjects) => {

        let newSubject = dataSubjects.map(dataSubject => {
            return new Promise((resolve, reject) => {
                dataSubject.getTeachers().then((teachers) => {
                    dataSubject.Teachers = teachers
                    resolve(dataSubject)
                })
                // console.log(dataSubject.getTeachers())
            })
        })
        Promise.all(newSubject).then((newDataSubjects) => {
            //  console.log(dataSubjects)
            res.render('subject', { dataSubjects: newDataSubjects, pageTitle: 'Subject' })
        }).catch((reason) => {
            res.send(reason)
        })
    })


    // Model.Subject.findAll({
    //     include: [{
    //         model: Model.Teacher
    //     }]
    // }).then((dataSubjects) => {

    //     res.render('subject', { dataSubjects: dataSubjects, pageTitle: 'Subject' })
    // }).catch((reason) => {
    //     res.send(reason)
    // })
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
            res.redirect('/subjects')
        }).catch((reason) => {
            res.send(reason)
        })
})
//kerjain cuuy
router.get('/:id/enrolledstudents', function (req, res) {
    Model.StudentSubject.findAll({
        where: {
            idSubject: req.params.id
        }
    }).then((dataSS) => {
        let newDataSS = dataSS.map((studentsubject) => {
            return new Promise((resolve, reject) => {
                studentsubject.getStudent().then((dataStudents) => {
                    if (dataStudents) {
                        studentsubject.fullname = dataStudents.first_name + ' ' + dataStudents.last_name
                    } else {
                        studentsubject.fullname = ''
                    }
                    resolve(studentsubject)
                })
            })
        })
        Promise.all(newDataSS).then((result) => {
            result[0].getSubject().then((dataSubject) => {
                //console.log(result)
                res.render('enrolled-students', { dataStudentSubject: result, dataSubject: dataSubject, pageTitle: 'Enrolled Students' })
            })
        }).catch((reason) => {
            Model.Subject.findById(req.params.id).then((dataSubject) => {
                res.render('enrolled-students', { dataStudentSubject: '', dataSubject: dataSubject, pageTitle: 'Enrolled Students' })
            })

        })
    })


    //console.log(req.params.id)
    // Model.StudenSubject.findAll().then((dataStudent))
    // Model.StudentSubject.findAll({
    //     include: [Model.Student, Model.Subject], where:
    //     {
    //         idSubject: req.params.id
    //     }
    // }).then((result) => {
    //     console.log(result)
    //     //res.render('enrolled-students', { dataStudentSubject: result, pageTitle: 'Enrolled Student' })
    // })
})

router.get('/delete/:id', function (req, res) {
    Model.Subject.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/subjects')
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/:id/givescore', function (req, res) {
    Model.StudentSubject.findOne({
        include: [Model.Subject, Model.Student], where: {
            id: req.params.id
        }
    }).then((dataStudentSubject) => {
        //console.log(dataStudentSubject)
        //res.send(dataStudentSubject)
        res.render('give-score', { pageTitle: 'Give Score', dataStudentSubject: dataStudentSubject, message: '' })
    })

})

router.post('/:id/givescore', function (req, res) {
    let idSubject = req.body.idSubject
    // console.log(req.body)
    //console.log(req.query)
    // let StudentSubjectId = req.params.id
    Model.StudentSubject.update(
        {
            score: req.body.score
        },
        {
            where:
            {
                id: req.params.id
            }
        }).then(() => {
            res.redirect(`/subjects/${idSubject}/enrolledstudents`)
        })
})

module.exports = router