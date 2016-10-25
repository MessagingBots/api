'use strict';

let axios = require('axios');
let express = require('express');
let config = require('config');
let router = express.Router();
let { canvasApiUrl } = require('../../config/default');

const SCOPE_REQUEST = (process.env.SCOPE_REQUEST) ?
  (process.env.SCOPE_REQUEST) :
  config.get('scopeRequest');

/* GET /auth */

router.get('/facebook', (req, res) => {
  console.log('IN THE APIE!');
  console.log('about to render login');

console.log(req.body);
  console.log('passport');
  passport.use(new FacebookStrategy({
      clientID: req.body['clientID'],
      clientSecret: req.body['clientSecret'],
      callbackURL: 'https://messengerbots-api.herokuapp.com/api/v1/authenticate/facebook/return',
    },
    function(accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log('got access token!');
      // request({
      //   uri: 'https://graph.facebook.com/v2.6/me',
      //   qs: {
      //     access_token: req.body['pageAccessToken'],
      //     fields: 'recipient',
      //     account_linking_token: req.body['accountLinkingToken'],
      //   },
      //   method: 'GET',
      //   json: {}
      //
      // }, function (error, response, body) {
      //   if (!error && response.statusCode == 200) {
      //     console.log("Body: ", body);
      //     var USER_PAGE_SCOPED_ID = body.recipient;
      //     var USER_ACCESS_TOKEN = accessToken;
      //     console.log(profile);
      //     // Check if the user with profile.id exists  if it does do nothing if it does not Save everything to the database.
      //     res.send({
      //       'USER_PAGE_SCOPED_ID': USER_PAGE_SCOPED_ID,
      //     });
      //     //Inform the user accordingly what happened.
      //   } else {
      //     console.log("Error");
      //     console.error(response.error);
      //   }
      // });

      return cb(null, profile);
    })
  );

});

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