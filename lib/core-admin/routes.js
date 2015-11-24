var Static    = require('./controllers/static');

//var prefix = Config.get('/api/prefix') +'/'+ Config.get('/api/version');

exports.endpoints = [
  { method: 'GET',    path: '/{somethingss*}',  config: Static.get }
];
