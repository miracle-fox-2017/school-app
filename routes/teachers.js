const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res)=> {
  Model.Teacher.findAll().then((results) => {
    res.render('teachers.ejs', { error: null, dataContacts: results });
  });
});

// delete
router.get('/delete/:id', function(req, res) {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dataContacts) {
    res.redirect('../../teachers');
  })
})

module.exports = router;
