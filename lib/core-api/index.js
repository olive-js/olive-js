//var Joi = require('joi')
//var Calibrate = require('calibrate')

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

                reply({ message: 'Welcome to Olive api.' });
            },
            config: {
                validate: {
                    params: false
                },
                tags: ['api'],
                description: "Core API"
            }
        }
    ])

    next()
}

exports.register.attributes = {
    pkg: {
        "name": "core-api",
        version: require('../../package.json').version,
        "description": "Core api for olive js",
        "main": "index.js"
    }
}
