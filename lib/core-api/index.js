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
        },
        {
            method: 'GET',
            path: '/dogs/{id}',
            handler: function (request, reply) {

                var Dogs = request.collections.dogs;

                // Reply with promise
                reply(Dogs.findOne(request.params.id));
            }
        },
        {
            method: 'GET',      // Methods Type
            path: '/api/users',  // Url
            config: {
                // Include this API in swagger documentation
                tags: ['api'],
                description: 'Get All User data',
                notes: 'Get All User data'
            },
            handler: function (request, reply) { //Action

                // Response JSON object
                reply({
                    statusCode: 200,
                    message: 'Getting All User Data',
                    data: [
                        {
                            name:'Kashish',
                            age:24
                        },
                        {
                            name:'Shubham',
                            age:21
                        },
                        {
                            name:'Jasmine',
                            age:24
                        }
                    ]
                })
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
