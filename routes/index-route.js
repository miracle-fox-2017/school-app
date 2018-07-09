const express = require('express');
const router = express.Router();
const Model = require('../models');
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  res.render('index');
})

router.get('/register', function (req, res) {
  res.render('register');
})

router.post('/register', function (req, res) {
  Model.Account.findOne({
  	where: {
  		username: req.body.username
  	}
  }).then((account) => {
  		if (account === null) {
        Model.Account.create({
          username: req.body.username,
          password: req.body.password,
          StudentId: req.body.StudentId
        }).then(account => {
          res.redirect('/login');

        }).catch(err => res.send(err.message));

      } else {
         res.render('register', {message: 'Username already taken'});
      }
  })
})

router.get('/login', function (req, res) {
  res.render('login');
})

router.post('/login', function (req, res) {
  Model.Account.findOne({
    where: { username: req.body.username },
  }).then(account => {
    if(account) {
      bcrypt.compare(req.body.password, account.password).then(function(result) {
        if (result) {
          // Bikin Session disini
          req.session.loggedIn = true
          req.session.username = account.username
          // Redirect ke halaman Member only
          res.redirect('/students');
        } else {
          res.render('login', {message: "Failed to login"});
        }
      });
    }

  }).catch(err => res.send(err.message));
})

module.exports = router;