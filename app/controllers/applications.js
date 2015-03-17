'use strict';

var i18n = require('i18next');
var uid = require('../helpers/uid');
var clientClient = require('../clients/client-client');
var userClient = require('../clients/user-client');

exports.applications = function (req, res) {
  clientClient.findByCreatorId({
    userId: req.user.id
  }, function (err, clients) {
    if (err) {
      //
    }
    
    var userClients = clients;
        
    userClient.getTrustedClients({
      userId: req.user.id
    }, function (err, clients) {      
      res.render('settings/applications', {
        title: i18n.t('app.apps'),
        trustedClients: clients,
        clients: userClients
      });
    });
  });
};

exports.getNewApplication = function (req, res) {
  res.render('settings/applications-new');
};

exports.postNewApplication = function (req, res) {
  clientClient.create({
    name: req.body.name,
    description: req.body.description,
    homepageUrl: req.body.homepageUrl,
    authCallbackUrl: req.body.authCallbackUrl,
    userId: req.user._id
  }, function (err, client) {
    if (err) {
      return res.send(err);
    }

    return res.redirect('/settings/applications/' + client._id);
  });
};

exports.getApplication = function (req, res) {
  clientClient.getById({
    id: req.params.id
  }, function (err, client) {
    if (err) {
      return res.send(err);
    }

    if (client.userId !== req.user.id) {
      return res.send('You cannot view an app that was created by another user');
    }

    return res.render('settings/applications-edit', client);
  });
};

exports.postApplication = function (req, res) {
  clientClient.update({
    clientId: req.params.id,
    name: req.body.name,
    description: req.body.description,
    homepageUrl: req.body.homepageUrl,
    authCallbackUrl: req.body.authCallbackUrl
  }, function (err, client) {
    if (err) {
      return res.send(err);
    }

    return res.redirect('/settings/applications');
  });
};

exports.deleteApplication = function (req, res) {
  clientClient.getById({
    id: req.params.id
  }, function (err, client) {
    if (err) {
      return res.status(400).send(err);
    }

    if (!client) {
      return res.status(400).send('client not found');
    }

    if (client.userId !== req.user.id) {
      return res.status(400).send('Only the creator can remove a client');
    }

    clientClient.remove({
      clientId: req.params.id
    }, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send('Success');
    });
  });
};

exports.postRevoke = function (req, res) {
  req.user.trustedClients.splice(req.user.trustedClients.indexOf(req.params.id), 1);
  req.user.save(function (err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send('Success');
  });
};

exports.postRevokeAll = function (req, res) {
  req.user.trustedClients.splice(0, req.user.trustedClients.length);
  req.user.save(function (err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send('Success');
  });
};

exports.getConnection = function (req, res) {
  clientClient.getById({
    id: req.params.id
  }, function (err, client) {
    if (err) {
      //
    }

    res.render('settings/applications-view', client);
  });
};