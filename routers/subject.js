const express = require('express');
const Models = require('../models');

const route = express.Router();



route.get('/',(req,res)=>{
  Models.Subject.findAll().then(data=>{
    // res.send(data)
    res.render('subject',{subject:data})
  })
})





module.exports = route;
