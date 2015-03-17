/* jshint node:true */
'use strict';

var passport = require('passport');
var path = require('path');
var glob = require('glob');

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    });
  });

  // Deserialize sessions
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Initialize strategies
  glob.sync('./config/strategies/**/*.js').forEach(function (strategy) {
    require(path.resolve(strategy))();
  });
};