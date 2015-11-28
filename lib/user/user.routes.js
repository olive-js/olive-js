const UserController = require('./user.controller');
const Config = require('../config/config');

var internals = {};
internals.endpoints = {};

internals.endpoints.private = [
  { method: 'POST',   path: '/users',           config: UserController.create },
  { method: 'GET',    path: '/users/scopes',    config: UserController.getScopes },
  { method: 'GET',    path: '/users/{userId}',  config: UserController.getOne },
  { method: 'PUT',    path: '/users/{userId}',  config: UserController.update },
  { method: 'DELETE', path: '/users/{userId}',  config: UserController.delete }
];

internals.endpoints.public = [
  { method: 'GET',    path: '/users',           config: UserController.getAll }
];

module.exports.getPrivateRoutes = function(options) {
    var allRoutes = internals.endpoints.public.concat(internals.endpoints.private);
    return allRoutes;
};

module.exports.getPublicRoutes = function(options) {
    return internals.endpoints.public;
};
