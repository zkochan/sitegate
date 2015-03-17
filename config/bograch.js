'use strict';

var config = require('./config');
var bo = require('bograch');
var AmqpTransporter = require('bograch-amqp');

bo.use(new AmqpTransporter({
  amqpURL: config.amqpURL
}));