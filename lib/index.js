// Load modules

var Glue = require('glue');
var Hapi = require('hapi');
var Config = require('../config.json');
var Vision          = require('vision');
var Inert           = require('inert');
var Dogwater = require('dogwater');
var Memory = require('sails-memory');

// Internals

var internals = {
    manifest: {
        connections: [{
            host: 'localhost',
            port: Config.port || 3000,
            labels: ['admin']
        },
        {
            host: 'localhost',
            port: Config.apiPort || 3033,
            labels: ['api']
        }],
        plugins: {
            Inert,
            Vision,
            './core-admin': [{ 'select': ['admin']}],
            './core-api': [{ 'select': ['api']}],
            good: {
                opsInterval: 5000,
                reporters: [
                    { 'reporter': 'good-console', 'events': { 'log': '*' } }
                ]
            },
            'hapi-swagger': {
                apiVersion: "0.0.1"
            },
            dogwater: {
              adapters: {
                  memory: Memory
              },
              connections: {
                  simple: { adapter: 'memory' },
              },
              models: [
                  {
                      identity: 'dogs',
                      connection: 'simple',
                      attributes: { name: 'string' }
                  }
              ],
              fixtures: [
                  {
                      model: 'dogs',
                      items: [
                          { name: 'Guinness' },
                          { name: 'Sully' },
                          { name: 'Ren' }
                      ]
                  }
              ],
          }
        }
    }
};

internals.startServer = function(){
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

          console.log('✅  Server is listening!');
      });
  });
}

exports.start = internals.startServer;
