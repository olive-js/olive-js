var glob = require('glob');
var path = require('path');



exports.register = function (plugin, options, next) {

    var settings = {path: __dirname};
    if (options.client) {
        settings.client = options.client;
    }
    load(settings, function (err, models) {

        if (err) {
            throw err;
        }
        plugin.expose('models', models);

        next();
    });
};

exports.register.attributes = {
    name: 'models',
    version: require('../../package.json').version
};
