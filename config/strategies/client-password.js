'use strict';

var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var clientClient = require('../../app/clients/client-client');

module.exports = function () {
  passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
      clientClient.getById({
        id: clientId
      }, function (err, client) {
        if (err) {
          return done(err);
        }
        if (!client) {
          return done(null, false);
        }
        if (client.secret != clientSecret) {
          return done(null, false);
        }
        return done(null, client);
      });
    }
  ));
};