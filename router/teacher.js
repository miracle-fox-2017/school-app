const express = require('express');
const router  = express.Router();

const model = require('../models')

router.get('/', function(req,res){
	model.Teacher.findAll()
	.then(allTeacher =>{
		res.render('teachers', {allTeacher})
	})
	.catch(err =>{
		res.send(err)
	})
})



module.exports = router;