const routes = require('./routes');

exports.register = function (plugin, options, next) {
    plugin.route(routes(options));

    next();
}

exports.register.attributes = {
    pkg: {
        "name": "public-site"
    }
}
