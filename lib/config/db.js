const Mongoose = require('mongoose');
const Config = require('./config');
const UserModel = require('../user/user.model');

Mongoose.connect(Config.get('/mongoUri'));
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));


exports.Mongoose = Mongoose;
exports.db = db;
exports.open = function(){
  db.once('open', function callback() {
      console.log("Connection with database succeeded.");
  });
};

exports.loadTestData = function(){

  var admin = {
    "username": "admin",
    "email": "admin@olivessss.com",
    "password":"admin",
    "scope": ["admin"],
    "active": true
  };

  /*var User = UserModel.User;
  User.findOne({ _username: 'admin' }, function (err, user) {
    if (err) {
        throw err;
    }
    if(!user) {
      var admin = new User(admin);
      admin.save(function(err) {
        if (err) {
            throw err;
        }
      });
    }
  });*/
};
