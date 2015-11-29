var Confidence = require('confidence'),
    Config = require('./config')
    ;

var criteria = {
    env: process.env.NODE_ENV
};

var notDef = {
  host: 'localhost'
};


var manifest = {
    $meta: 'This file defines the service.',
    server: Config.get('/server'),
    connections: [
      {
          host: notDef.host,
          port: notDef.port || 3000,
          labels: ['http']
      },
      {
          host: notDef.host,
          port: notDef.port || 3001,
          labels: ['admin'],
          routes: {
            cors: {
              origin: ['*']
            }
          }
      },
      {
          host: notDef.host,
          port: notDef.apiPort || 3002,
          labels: ['private-api'],
          routes: {
            cors: {
              origin: ['http://localhost:3000', 'http://localhost:8000']
            }
          }
      },
      {
          host: notDef.host,
          port: notDef.apiPort || 3003,
          labels: ['public-api'],
          routes: {
            cors: {
              origin: ['*']
            }
          }
      }
    ],
    plugins: {
        'inert': {},
        'vision': {},
        'blipp': {},
        'h2o2': {},
        'hapi-auth-jwt2': {},
        './auth': {
          key: Config.get('/jwt/key'),
          verifyOptions: Config.get('/jwt/verifyOptions')
        },
        './proxy': [{ 'select': ['http']}],
        './admin-ui': [{ 'select': ['admin']}],
        './public-api': [{ 'select': ['public-api']}],
        './private-api': [
              {
                  select: ['admin', 'private-api'],
                  routes: {
                      prefix: '/admin/api'
                  }
              }
          ],


        good: {
            opsInterval: 5000,
            reporters: [
                { 'reporter': 'good-console', 'events': { 'log': '*' } }
            ]
        }
    }
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
