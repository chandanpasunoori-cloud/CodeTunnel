var express = require('express'),
  passport = require('passport'),
  stylus = require('stylus'),
  path = require('path'),
  socialAuth = require('./socialAuth'),
  settings = require('../settings');

exports.config = function (app) {

  socialAuth.config();

  // Default configuration.
  app.configure(function(){

    // Never cache crap by default. (I'm looking at you IE)
    app.use(function (req, res, next) {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      next();
    });

    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');
    app.use(express.favicon( __dirname + '/../public/images/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('piano cat'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware('/../public'));
    app.use(express.static(path.join('public')));

    //  Build custom settings object to be passed to views.
    app.use (function (req, res, next) {
      settings.user = req.user;
      req.settings = settings;
      next();
    });

    // Handle routes for this request.
    app.use(app.router);
  });

  // Development configuration.
  app.configure('development', function(){
    app.use(express.errorHandler());
  });

};