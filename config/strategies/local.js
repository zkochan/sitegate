'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userClient = require('../../app/clients/user-client');

module.exports = function () {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      userClient.authenticate({
        usernameOrEmail: username,
        password: password
      }, done);
    }
  ));
};