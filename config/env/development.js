/* jshint node:true */
'use strict';

module.exports = {
  db: 'mongodb://localhost/ssoapp-dev',
  amqpURL: 'amqp://guest:guest@localhost:5672',
  facebook: {
    clientID: process.env.FACEBOOK_ID || '391179464377243',
    clientSecret: process.env.FACEBOOK_SECRET || 'edfafc7715060f8cb4c7212833a3c87a',
    callbackURL: 'http://account.sitegatedev.com:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'j5UFdNnFLv6t24syOiDglfRIX',
    clientSecret: process.env.TWITTER_SECRET || 'GZMmhyaUcsaQULXQknfmXCEh8KTG91UGBeQED19ASvhsaDO7Ba',
    callbackURL: 'http://account.sitegatedev.com:3000/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '295363747259-4f4o7483ce5q74a6v31n05s23ke37dii.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'rcBTWhsCnytAl6bXr3iTnjPs',
    callbackURL: 'http://account.sitegatedev.com:3000/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};