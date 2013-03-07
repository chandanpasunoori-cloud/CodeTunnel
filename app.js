// Load environment-specific configuration.
if (process.env.NODE_ENV) require('./config')[process.env.NODE_ENV]();

// Load required modules.
var port = process.env.PORT,
  http = require('http'),
  express = require('express'),
  middleware = require('./middleware'),
  routes = require('./routes');

var app = express();

// Register middleware.
middleware.config(app);

// Register routes.
routes.register(app);

// Start server
http.createServer(app).listen(port, function(){
  console.log("App is listening on port " + port);
});