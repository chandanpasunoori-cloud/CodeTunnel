var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    stylus = require('stylus'),
    path = require('path'),
    moment = require('moment'),
    markdown = require('marked');

module.exports = function (app, config, passport) {

    // should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(express.favicon(__dirname + '/../public/images/favicon.ico'));
    app.use(stylus.middleware(__dirname + '/../public'));
    app.use(express.static(path.join(__dirname, '/../public')));
    app.use(express.logger('dev'));

    // set views path, template engine and default layout
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');

    // Expose helpers to the views.
    app.locals = {
        title: process.env.BANNER_TEXT,
        bannerText: process.env.BANNER_TEXT,
        moment: moment,
        markdown: markdown
    };

    // Setup helper methods for rendering views with/without a layout file.
    app.use(function (req, res, next) {
        if (!req.session.redirectUrl)
            req.session.redirectUrl = '/';
        res.renderView = function (viewName, viewModel) {
            if (!req.xhr)
                res.render(viewName + '_full', viewModel);
            else
                res.render(viewName, viewModel, function (err, view) {
                    if (err) return next(err);
                    res.json({
                        title: viewModel.title || app.locals.title,
                        bannerText: viewModel.bannerText || app.locals.bannerText,
                        view: view,
                        url: req.url
                    });
                });
        };
        res.locals = {
            user: req.user,
            currentUrl: encodeURIComponent(req.url)
        };
        next();
    });

    // Redirect www.codetunnel.com requests to codetunnel.com.
    app.use(function (req, res, next) {
        if (req.get('host').match(/^www.*$/i))
            res.redirect('http://codetunnel.com' + req.url);
        else
            next();
    });

    // Never cache crap by default. (I'm looking at you IE)
    app.use(function (req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        next();
    });

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
        secret: 'noobjs',
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    // routes should be at the last
    app.use(app.router);

    // handle 404
    app.use(function (req, res, next) {
        try {
            res.status(404);
            var viewModel = {
                title: 'Page Not Found',
                bannerText: 'Page Not Found',
                url: req.url
            };
            res.renderView('shared/404', viewModel);
        }
        catch (err) {
            next(err);
        }
    });

    // Handle server errors.
    app.use(function (err, req, res, next) {
        try {
            var statusCode = err.status || 500;
            res.status(statusCode);
            var viewModel = {
                title: statusCode + ' server error',
                bannerText: 'Uh oh!',
                statusCode: statusCode,
                error: err
            };
            res.renderView('shared/500', viewModel);
        }
        catch (ex) {
            console.error('Error while rendering error view.');
            console.error(ex.stack);
            next(err);
        }
    });

    // Development configuration.
    app.configure('development', function () {
        app.use(express.errorHandler());
    });

};
