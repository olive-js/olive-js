const Glue = require('glue');
const Manifest = require('./config/manifest');
const db = require('./config/db');

var internals = {};
var composeOptions = {
    relativeTo: __dirname
};


internals.composer = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);

internals.startServer = function(){


  internals.composer(function (err, server) {
      if (err) {
          console.log('SERVER CANNOT BE STATED');
          throw err;
      }

      server.start(function () {
          console.log('✅  Olive api server is listening!');
          db.open();
          db.loadTestData();
      });


  });
}
exports.start = internals.startServer;
