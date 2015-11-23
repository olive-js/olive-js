// Load modules

var Glue = require('glue');
var Hapi = require('hapi');
var Config = require('../config.json');


// Internals

var internals = {
    manifest: {
        connections: [{
            port: Config.port || 3000,
            labels: ['admin']
        },
        {
            port: Config.apiPort || 3033,
            labels: ['api']
        }],
        plugins: {
            './core-admin': [{ 'select': ['admin']}],
            './core-api': [{ 'select': ['api']}],
            good: {
                opsInterval: 5000,
                reporters: [
                    { 'reporter': 'good-console', 'events': { 'log': '*' } }
                ]
            }
        }
    }
};

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
