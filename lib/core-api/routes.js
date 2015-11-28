var UserController = require('./controllers/user');
var Config = require('./config/config');

var internals = {};

var prefix = Config.get('/api/prefix') +'/'+ Config.get('/api/version');

internals.endpoints = [
  { method: 'POST',   path: prefix +'/users',           config: UserController.create },
  { method: 'GET',    path: prefix +'/users',           config: UserController.getAll },
  { method: 'GET',    path: prefix +'/users/scopes',    config: UserController.getScopes },
  { method: 'GET',    path: prefix +'/users/{userId}',  config: UserController.getOne },
  { method: 'PUT',    path: prefix +'/users/{userId}',  config: UserController.update },
  { method: 'DELETE', path: prefix +'/users/{userId}',  config: UserController.delete }
];


module.exports = function(options) {
    return internals.endpoints;
};
