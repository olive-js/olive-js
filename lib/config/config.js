const Confidence  = require('confidence');
const Package       = require('../../package');

var criteria = {
    env: process.env.NODE_ENV
};

var config = {
    $meta: 'This file configures the service.',
    version: Package.version,
    port: {
        $filter: 'env',
        production: process.env.PORT,
        test: 9000,
        $default: 3000
    },
    server: {
        debug: {
          $filter: 'env',
          production: false,
          test: false,
          $default: { request: ['error'] }
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    api: {
      prefix: '/api',
      version: 'v1'
    },
    mongoUri: {
      $filter: 'env',
      production: process.env.MONGO_URI,
      test: 'mongodb://localhost:27017/olivejs-test',
      $default: 'mongodb://localhost:27017/olivejs'
    },
    jwt: {
      $filter: 'env',
      production: {
        key: process.env.JWT_SECRET,
        expiresIn: 15*60, // 15 mins
        verifyOptions: { algorithms: [ 'HS256' ] }
      },
      $default: {
        key: 'NeverShareYourSecret',
        expiresIn: 4*60*60, // 4 Hours
        verifyOptions: { algorithms: [ 'HS256' ] }
      },
    },
    saltRounds: 10,
    swaggerOptions: {
      apiVersion: Package.version,
      documentationPath: '/docs',
      endpoint: '/api/specs',
      info: {
        title: 'Olive js',
        description: 'A user service designed for SOA systems.'
      }
    }
};


var store = new Confidence.Store(config);


exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};
