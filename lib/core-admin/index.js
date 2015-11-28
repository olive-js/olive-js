const routes = require('./routes');

exports.register = function (plugin, options, next) {
    plugin.route(routes(options));
    next();
}

exports.register.attributes = {
    pkg: {
        "name": "core-admin",
        version: require('../../package.json').version,
        "description": "Core admin for olive js",
        "main": "index.js"
    }
}
