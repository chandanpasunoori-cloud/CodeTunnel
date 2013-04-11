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
var server = http.createServer(app).listen(port, function(){
  console.log("App is listening on port " + port);
});

// Attach shotgun.
var shotgun = require('shotgun'),
    shotgunClient = require('shotgun-client'),
    shell = new shotgun.Shell('shotgunCmds');

shotgunClient.attach(server, shell);