const UserRoutes = require('./user/user.routes');
const TokenRoutes = require('./auth/token.routes');

exports.register = function (plugin, options, next) {

    plugin.route(UserRoutes.getPrivateRoutes(options));
    plugin.route(TokenRoutes.getPrivateRoutes(options));

    next();
}

exports.register.attributes = {
    pkg: {
        "name": "private-api"
    }
}
