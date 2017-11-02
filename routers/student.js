const express = require('express');
const Model = require('../models');

const route = express.Router();


route.get('/',(req,res)=>{
  Model.Student.findAll().then(data=>{
    res.render('student',{student : data})
  })
})

route.get('/add',(req,res)=>{
  let err  ='';
  res.render('studentAdd',{err})
})


route.post('/add',(req,res)=>{
  Model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email })
  .then(task => {
    res.redirect('/student')
  }).catch(err=>{
    // res.send(err.errors[0])

    res.render('studentAdd',{err})
  })

})

route.get('/edit/:id',(req,res)=>{
  Model.Student.findById(req.params.id).then(data => {
  // res.send(data)
  res.render('studentEdit',{edit : data})
  })
})

route.post('/edit/:id',(req,res)=>{
  Model.Student.update({first_name:req.body.first_name, last_name: req.body.last_name, email: req.body.email },
    {where: { id: req.params.id }})
  .then(() => {res.redirect('/student')})
})

route.get('/delete/:id',(req,res)=>{
  Model.Student.destroy({where :{id : req.params.id},truncate: true}).then(()=>{
    res.redirect('/student')
  })
})
// Task.destroy({ where: {subject: 'programming'},truncate: true /* this will ignore where and truncate the table instead */
//   });

module.exports = route;
