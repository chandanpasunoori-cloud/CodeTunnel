// Load required modules.
var port = process.env.PORT,
    express = require('express'),
    routes = require('./routes'),
    passport = require('./config/passport'),
    path = require('path'),
    fs = require('fs');

var app = express();

// Bootstrap models
var models_path = path.join(__dirname, '/models');
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// Register routes.
routes.register(app);

// Start server
var server = app.listen(port, function(){
  console.log("App is listening on port " + port);
});

// Load shotgun modules and instantiate any shells.
var shotgun = require('shotgun'),
    shotgunClient = require('shotgun-client'),
    resumeShell = new shotgun.Shell('resumeCmds');

// Attach shotgun-client to server instance and associate shell instances.
shotgunClient.attach(server, resumeShell);
