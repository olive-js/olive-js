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
          port: Config.get('/port'),
          labels: ['http', 'admin', 'private-api']
      },
      /*{
          port: Config.get('/port'),
          labels: ['admin']
      },
      {
          port: Config.get('/port'),
          labels: ['private-api']
      },
      {
          port: Config.get('/port'),
          labels: ['public-api']
      }*/
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
        /*'./proxy': [
            {
              select: ['http']
            }
        ],*/
        './admin-ui': [
            {
              select: ['admin'],
              routes: {
                  prefix: '/admin'
              }
            }
        ],
        './private-api': [
            {
                select: ['private-api'],
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
