const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res)=> {
  Model.Subject.findAll().then((results) => {
    res.render('subjects.ejs', { error: null, dataContacts: results });
  });
});

module.exports = router;
