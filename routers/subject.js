const express = require('express');
const router = express.Router();

const Model = require('../models/');

router.get('/', (req, res)=>{
  Model.Subject.findAll()
  .then(dataSubject=>{
    let dataS = {
      title : "Subjects",
      rows : dataSubject

    }
    res.render('subjects', dataS)
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
