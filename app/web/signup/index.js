'use strict'
const signupView = require('./views/signup')
const preSession = require('humble-session').pre
const t = require('i18next').t

module.exports = function(plugin, opts, next) {
  plugin.route({
    method: 'GET',
    path: '/signup',
    config: {
      auth: {
        mode: 'try',
      },
      plugins: {
        'humble-auth': {
          redirectTo: false,
        },
      },
    },
    handler(request, reply) {
      if (request.auth.isAuthenticated)
        return reply.redirect(opts.homepageUrl)

      reply.vtree(signupView({}))
    },
  });

  plugin.route({
    method: 'POST',
    path: '/signup',
    config: {
      auth: false,
    },
    handler(req, reply) {
      let userService = req.server.plugins['jimbo-client'].user

      let user = req.payload

      /* Add missing user fields */
      user.provider = 'local';
      user.displayName = user.firstName + ' ' + user.lastName
      user.emailVerified = false

      userService.register(user, function(err, user) {
        if (err) {
          return reply.vtree(signupView({
            username: req.payload.username,
            password: req.payload.password,
            email: req.payload.email,
            messages: {
              error: t('account.error.' + (err.type || 'unknown')),
            },
          }))
        }

        reply.setSession({
          user: {
            id: user.id,
          },
        }, err => {
          if (err) return reply(err).status(400)

          return reply.redirect(opts.homepageUrl)
        })
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'web/signup',
}
