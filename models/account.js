'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    StudentId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // Hook
  Account.beforeCreate((account, options) => {
    const saltRounds = 10;
    let plainPassword = account.password;

    return bcrypt.hash(plainPassword, saltRounds).then(function(hash) {
      account.password = hash;
    });
  });


  return Account;
};