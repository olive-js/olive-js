const routes = require('./routes');

exports.register = function (plugin, options, next) {
    plugin.route(routes(options));

    /*plugin.route({
      method: '*',
        path: '/{path*}',
        handler: {
          proxy: {
            host: 'localhost',
            port: 4001,
            protocol: 'http',
            passThrough: true,
            redirects: 5
          }
        }
      });*/

    next();
}

exports.register.attributes = {
    pkg: {
        "name": "core-admin"
    }
}
