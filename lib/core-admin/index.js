//var Joi = require('joi')
//var Calibrate = require('calibrate')
var Routes = require('./routes');

exports.register = function (plugin, options, next) {

    //var user = plugin.plugins['user']
    //var db = plugin.plugins['hapi-level'].db.sublevel('organisations')

    //var Organisation = require('./Organisation')(db, user)

    //plugin.expose(Organisation)

    plugin.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                reply({ message: 'Welcome to Olive admin page.' });
            },
            config: {
                validate: {
                    params: false
                },
                tags: ['http'],
                description: "Admin operations"
            }
        }
    ])

    next()
}

exports.register.attributes = {
    pkg: {
        "name": "core-admin",
        version: require('../../package.json').version,
        "description": "Core admin for olive js",
        "main": "index.js"
    }
}
