
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  settings = {
    bannerText: 'Code.Tunnel();'
  };

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use (function (req, res, next) {
    req.settings = settings;
    req.isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';
    next();
  });
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function (str, path) {
      var mylib = function(style) {
        style.define('randomColor', function () {
          //var unit = new stylus.nodes.Unit('#5f5', 'rgba');
          var rgb = stylus.color();
          return rgb;
        });
      };
      return stylus(str).use(mylib);
    }
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.home);
app.get('/users', user.list);
app.get('/projects', routes.projects);
app.get('/about', routes.about);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});