var mongoose = require('mongoose');
var Schema = mongoose.Schema();


// create User Schema
var User = new Schema({
  name: String,
  email: String,
  oauthID: String
});


module.exports = mongoose.model('users', User);
