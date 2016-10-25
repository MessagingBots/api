'use strict';

let axios = require('axios');
let express = require('express');
let config = require('config');
let router = express.Router();
let { canvasApiUrl } = require('../../config/default');

const SCOPE_REQUEST = (process.env.SCOPE_REQUEST) ?
  (process.env.SCOPE_REQUEST) :
  config.get('scopeRequest');

/* GET /login/ */
// let redirectURI = '';
// let authCode = "1234567890"

module.exports = function(passport) {

  router.get('/facebook', (req, res, next) => {
    console.log('about to call passport facebook!');

    var accountLinkingToken = req.query['account_linking_token'];
    let redirectURI = req.query['redirect_uri'];
    var authCode = "1234567890"
    console.log(`accountLinkingToken: ${accountLinkingToken}`);
    console.log(`redirectURI: ${redirectURI}`);
    req.session.redirectURI = redirectURI;
    req.session.authCode = authCode;
    passport.authenticate('facebook', {
      'scope':'email'
    })(req, res, next);
  });

  router.get('/facebook/callback', (req, res, next) => {
    console.log('got the callback!');
    passport.authenticate('facebook', {
    }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.send({'error':'user not found'});
      req.login(user, (err) => {
        console.log('LOGGING IN USER from callback');
        if (err) return next(err);
        console.log();
        return res.redirect(`${req.session.redirectURI}&authorization_code=${req.session.authCode}`);
      });
    })(req, res, next);
  });

  return router;
}