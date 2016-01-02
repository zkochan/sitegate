'use strict';

const R = require('ramda');
const handlers = require('./handlers');
const preSession = require('humble-session').pre;

exports.register = function(server, opts, next) {
  let bellOpts = {
    forceHttps: opts.forceHttps,
    isSecure: opts.isSecure,
  };

  ['facebook', 'google', 'twitter', 'github'].forEach(function(provider) {
    if (!opts[provider]) return;

    server.auth.strategy(provider, 'bell', R.merge(bellOpts, opts[provider]));

    server.route({
      path: '/auth/' + provider,
      method: 'GET',
      config: {
        auth: provider,
        pre: [preSession],
        handler: handlers.sessionManagement,
      },
    });
  });

  server.auth.strategy('default', 'session', true, {
    redirectTo: '/signin',
    appendNext: true,
  });

  server.route({
    path: '/auth/{strategy}/disconnect',
    method: 'GET',
    handler(req, reply) {
      let userService = req.server.plugins.user;

      userService.disconnectProvider({
        userId: req.auth.credentials.id,
        strategy: req.params.strategy,
      }, function(err) {
        if (err) return reply(err);

        return reply.redirect('/settings/accounts');
      });
    },
  });
  next();
};

exports.register.attributes = {
  name: 'auth',
};
