const express = require('express');
const router = express.Router();
const Model = require('./../models')

router.get('/', function (req, res) {
    Model.Subject.findAll().then((dataSubjects) => {
        res.render('subject', { dataSubjects: dataSubjects, pageTitle: 'Subject' })
    }).catch((reason) => {
        res.send(reason)
    })
})


module.exports = router