/* jshint node:true */
'use strict';

var userClient = require('../clients/user-client');
var config = require('../../config/config');
var i18n = require('i18next');

function renderSignUp(res, locals) {
  locals = locals || {};
  locals.title = i18n.t('account.signUp');
  locals.cancelUrl = config.sitegateClient.domain + config.sitegateClient.publicHomepage;
  res.render('signup', locals);
}

exports.get = function (req, res, next) {
  renderSignUp(res);
};

/**
 * Signup
 */
exports.post = function (req, res, next) {
  var user = req.body;

  // Add missing user fields
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.emailVerified = false;

  userClient.register(user, function (err, user) {
    if (err) {
      return renderSignUp(res, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        messages: {
          error: i18n.t('account.error.' + (err.name || 'unknown'))
        }
      });
    }

    req.login(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      
      return require('../go-callback')(req, res, next);
    });
  });
};