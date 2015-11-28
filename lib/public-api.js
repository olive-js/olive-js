const UserRoutes = require('./user/user.routes');

exports.register = function (plugin, options, next) {

    plugin.route(UserRoutes.getPublicRoutes(options));
    next();
}

exports.register.attributes = {
    pkg: {
        "name": "private-api"
    }
}
