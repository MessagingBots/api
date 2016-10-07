'use strict';

let axios = require('axios');
let express = require('express');
let config = require('config');
let router = express.Router();
let { canvasApiUrl } = require('../../config/default');
let passport = require('passport');
let Strategy = require('passport-facebook').Strategy;

const SCOPE_REQUEST = (process.env.SCOPE_REQUEST) ?
  (process.env.SCOPE_REQUEST) :
  config.get('scopeRequest');

/* GET /auth */

router.get('/facebook', (req, res) => {
  res.render('login');
})

router.get('/login/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: SCOPE_REQUEST }));


router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login/error' }),
  function(req, res) {
    res.render('login_success');
});

router.get('/error', function(req, res) {
  console.log("Login not successful!");
  res.render('login_failure');
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = router;