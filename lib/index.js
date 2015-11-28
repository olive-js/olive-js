const Glue = require('glue');
const Manifest = require('./config/manifest');
const db = require('./config/db');

var internals = {

};
var composeOptions = {
    relativeTo: __dirname
};


internals.composer = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);

internals.startServer = function(){


  internals.composer(function (err, server) {
      if (err) {
          throw err;
      }

      server.start(function () {
          console.log('✅  Olive api server is listening!');
          db.open();
          db.loadTestData();
      });


  });
}
exports.start = internals.startServer;

// Load modules
/*
const Glue   = require('glue');
const Hapi   = require('hapi');
const Vision = require('vision');
const Inert  = require('inert');
const Promise = require("bluebird");
const Config = require('./config/config');

var Manifest = require('./config/manifest');

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
            labels: ['admin'],
            routes: {
              cors: {
                origin: ['*']
              }
            }
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
            './admin-ui': [{ 'select': ['admin']}],
            './private-api': [{ 'select': ['private-api']}],
            './public-api': [{ 'select': ['public-api']}],
            good: {
                opsInterval: 5000,
                reporters: [
                    { 'reporter': 'good-console', 'events': { 'log': '*' } }
                ]
            }
          }
        }
};


internals.startServer = function(){

  var db = require('./config/db');
  db.open();

  if (!process.env.PRODUCTION) {
      internals.manifest.plugins['blipp'] = [{}];
      internals.manifest.plugins['good'].reporters[0].events['ops'] =  '*';
  }

  var options = {
      relativeTo: __dirname
  };

  Glue.compose(internals.manifest, options, function (err, server) {


      server.start(function () {
          console.log('✅  Olive api server is listening!');
      });





  });
}
exports.start = internals.startServer;

*/
