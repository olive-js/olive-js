const TokenController = require('./token.controller');
const Config = require('../config/config');

var internals = {};
internals.endpoints = {};

internals.private = [
];

internals.public = [
  { method: 'POST',   path: '/tokens/refresh',  config: TokenController.refresh },
  { method: 'POST',   path: '/tokens/access',   config: TokenController.access }
];

module.exports.getPrivateRoutes = function(options) {
    var allRoutes = internals.public.concat(internals.private);
    return allRoutes;
};

module.exports.getPublicRoutes = function(options) {
    return internals.public;
};
