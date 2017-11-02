const express = require('express');
const Models = require('../models')

const route = express.Router();


route.get('/',(req,res)=>{
  Models.Teacher.findAll().then(data=>{
    // res.send(data)
    res.render('teacher',{teacher : data})
  })
})






module.exports = route;
