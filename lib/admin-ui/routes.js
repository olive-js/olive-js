var Static    = require('./controllers/static');

var internals = {};

internals.endpoints = [
  { method: 'GET',    path: '/{somethingss*}',  config: Static.get }
];

module.exports = function(options) {
    return internals.endpoints;
};
