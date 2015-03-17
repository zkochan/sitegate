'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'oauth'
});

client.register(['exchange', 'createCode', 'authToken']);

module.exports = client;