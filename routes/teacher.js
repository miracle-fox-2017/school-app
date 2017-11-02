const express = require('express');
const router = express.Router();
const Model = require('../models')


router.get('/', function (req, res) {
    Model.Teacher.findAll().then((dataTeachers) => {
        res.render('teacher', { dataTeachers: dataTeachers, pageTitle : "Teacher" })
    }).catch((reason) => {
        res.send(reason)
    })
})



module.exports = router