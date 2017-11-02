const express = require('express');
const router = express.Router();
const db = require('../models')



router.get('/', (req,res)=>{
  db.Teacher.findAll().then((data) => {
    res.render('teachers',{data})
}).catch((err)=>{
  console.log(err);
})

})

module.exports = router
