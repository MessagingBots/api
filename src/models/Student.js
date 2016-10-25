let mongoose = require('mongoose');


// @TODO: Add schema object for canvas
let StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  // @TODO Find datatype for password
  password: String,
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  slack: {

  }
});

module.exports = mongoose.model('Student', StudentSchema);