// Load modules

const Glue   = require('glue');
const Hapi   = require('hapi');
const Vision = require('vision');
const Inert  = require('inert');

//TODO move configs to confidence.
var config = {
  host: 'localhost'
};

// Internals

var internals = {
    manifest: {
        connections: [{
            host: config.host,
            port: config.port || 3000,
            labels: ['admin']
        },
        {
            host: config.host,
            port: config.apiPort || 3001,
            labels: ['private-api'],
            routes: {
              cors: {
                origin: ['*']
              }
            }
        },
        {
            host: config.host,
            port: config.apiPort || 3002,
            labels: ['public-api'],
            routes: {
              cors: {
                origin: ['*']
              }
            }
        }],
        plugins: {
            Inert,
            Vision,
            './core-admin': [{ 'select': ['admin']}],
            './core-api': [{ 'select': ['private-api']}],
            good: {
                opsInterval: 5000,
                reporters: [
                    { 'reporter': 'good-console', 'events': { 'log': '*' } }
                ]
            }
          }
        }
};

/**
'hapi-swagger': {
    'select': ['private-api'],
    'apiVersion': '0.0.1'
}
*/

internals.startServer = function(){

  var db = require('./core-api/config/db');
  db.open();

  if (!process.env.PRODUCTION) {
      internals.manifest.plugins['blipp'] = [{}];
      internals.manifest.plugins['good'].reporters[0].events['ops'] =  '*';
  }

  var options = {
      relativeTo: __dirname
  };

  Glue.compose(internals.manifest, options, function (err, server) {

      if (err) {
          throw err;
      }

      server.start(function () {
          console.log('✅  Olive api server is listening!');
      });

  });
}
exports.start = internals.startServer;
