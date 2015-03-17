'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var oauthClient = require('../../app/clients/oauth-client');

module.exports = function () {
  passport.use(new BearerStrategy(
    function (accessToken, done) {
      oauthClient.authToken({
        accessToken: accessToken
      }, done);
    }
  ));
};