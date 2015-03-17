/* jshint node:true */
'use strict';

var userClient = require('../clients/user-client');
var errorHandler = require('../error-handler');

exports.email = function (req, res, next) {
  userClient.verifyEmail({
    token: req.params.token
  }, function (err, user) {
    if (err) {
      return res.status(400).send({
        message: 'Email verification token is invalid or has expired.'
      });
    }

    req.login(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      req.flash('profileSuccessMessages', 'You have successfully verified your email address');
      res.redirect('/settings/profile');
      return;
    });
  });
};