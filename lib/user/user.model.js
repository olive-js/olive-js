const Bcrypt = require('bcrypt');
const Config = require('../config/config');
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

function toLower (v) {
  return v.toLowerCase();
}

function hashPassword (v) {
  var salt = Bcrypt.genSaltSync(Config.get('/saltRounds'));
  return Bcrypt.hashSync(v, salt);
}

var UserSchema = new Schema({
  /*id: {
    type: String,
    unique: true,
    'default': shortid.generate
  },*/
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, set: toLower },
  password: { type: String, required: true, set: hashPassword },
  jti: { type: String },
  scope: { type: Array },
  active: { type: Boolean, required: true },
});

UserSchema.methods.checkPassword = function(password, cb) {
  return Bcrypt.compare(password, this.password, cb);
}

var user = mongoose.model('user', UserSchema);

module.exports = { User : user };
