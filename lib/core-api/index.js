const routes = require('./routes');

exports.register = function (plugin, options, next) {
    plugin.route(routes(options));
    next();
}

exports.register.attributes = {
    pkg: {
        "name": "core-api",
        version: require('../../package.json').version,
        "description": "Core api for olive js",
        "main": "index.js"
    }
}
