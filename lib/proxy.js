exports.register = function (server, options, next) {

  /*server.route({
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
    });
    */
  /*server.route({
    method: '*',
      path: '/browser-sync/socket.io/{path*}',
      handler: {
        proxy: {
          host: 'localhost',
          port: 4001,
          protocol: 'http',
          passThrough: true,
          redirects: 5
        }
      }
    });
*/

  server.route({
    method: '*',
      path: '/admin/{path*}',
      handler: {
        proxy: {
          host: 'localhost',
          port: 3001,
          protocol: 'http',
          passThrough: true,
          redirects: 5
        }
      }
    });
    server.route({
      method: '*',
        path: '/admin/api/{path*}',
        handler: {
          proxy: {
            host: 'localhost',
            port: 3002,
            protocol: 'http',
            passThrough: true,
            redirects: 5
          }
        }
      });

      server.route({
        method: '*',
          path: '/api/{path*}',
          handler: {
            proxy: {
              host: 'localhost',
              port: 3003,
              protocol: 'http',
              passThrough: true,
              redirects: 5
            }
          }
        });

    next();
}

exports.register.attributes = {
    pkg: {
        "name": "proxy"
    }
}
