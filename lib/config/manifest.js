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
    connections: [{
        host: notDef.host,
        port: notDef.port || 3000,
        labels: ['admin'],
        routes: {
          cors: {
            origin: ['*']
          }
        }
    },
    {
        host: notDef.host,
        port: notDef.apiPort || 3001,
        labels: ['private-api'],
        routes: {
          cors: {
            origin: ['http://localhost:3000', 'http://localhost:8000']
          }
        }
    },
    {
        host: notDef.host,
        port: notDef.apiPort || 3002,
        labels: ['public-api'],
        routes: {
          cors: {
            origin: ['*']
          }
        }
    }],
    plugins: {
        'inert': {},
        'vision': {},
        'blipp': {},
        'hapi-auth-jwt2': {},
        './auth': {
          key: Config.get('/jwt/key'),
          verifyOptions: Config.get('/jwt/verifyOptions')
        },
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
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
