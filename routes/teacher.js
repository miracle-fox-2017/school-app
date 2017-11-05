const express = require('express');
const router = express.Router();
const Model = require('../models')


router.get('/', function (req, res) {
    Model.Teacher.findAll({
        include: [Model.Subject]
    }).then((dataTeachers) => {
       // console.log(dataTeachers.Subject)
        res.render('teacher', { dataTeachers: dataTeachers, pageTitle: "Teacher" })
    }).catch((reason) => {
        res.send(reason)
    })
})



module.exports = router