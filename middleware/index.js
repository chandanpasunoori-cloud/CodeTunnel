var express = require('express'),
  passport = require('passport'),
  stylus = require('stylus'),
  path = require('path'),
  socialAuth = require('./socialAuth');

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
    app.use(stylus.middleware(__dirname + '/../public'));
    app.use(express.static(path.join(__dirname, '/../public')));

    app.use(function (req, res, next) {
      res.renderView = function (viewName, viewModel) {
        if (!req.xhr)
          res.render(viewName + '_full', viewModel);
        else
          res.render(viewName, viewModel, function (err, view) {
            if (view)
              res.json({
                title: viewModel.title || viewModel._locals.title,
                bannerText: viewModel.bannerText || viewModel._locals.bannerText,
                view: view
              });
            else
              throw err;
          });
      };
      res.locals = {
        title: process.env.BANNER_TEXT,
        bannerText: process.env.BANNER_TEXT,
        user: req.user
      };
      next();
    });

    // Handle routes for this request.
    app.use(app.router);

    // Handle 404 errors.
    app.use(function(req, res, next) {
      var bannerAndTitle = '404 not found';
      res.status(404);
      res.renderView('shared/404', {
        title: bannerAndTitle,
        bannerText: bannerAndTitle,
        url: req.url
      });
    });

    // Handle server errors.
    app.use(function(err, req, res, next) {
      var statusCode = err.status || 500,
        bannerAndTitle = statusCode + ' server error';
      res.status(statusCode);
      res.renderView('shared/500', {
        title: bannerAndTitle,
        bannerText: bannerAndTitle,
        statusCode: statusCode,
        error: err
      });
    });
  });

  // Development configuration.
  app.configure('development', function(){
    app.use(express.errorHandler());
  });

};