let facebook = require('./facebook');
let Student = require('../models/Student');

module.exports = function(passport){
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(student, done) {
      done(null, student._id);
    });

    passport.deserializeUser(function(id, done) {
      Student.findById(id, function(err, student) {
        done(err, student);
      });
    });

    // Setting up Passport Strategies for Facebook (add more)
    facebook(passport);
};