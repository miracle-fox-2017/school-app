const express = require('express');
const router = express.Router();
const db = require('../models')



router.get('/', (req,res)=>{
  db.Subject.findAll().then((data) => {
    res.render('subjects',{data});
}).catch((err)=>{
  console.log(err);
})
})

module.exports = router
