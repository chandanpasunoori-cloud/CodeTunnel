
/**
 * Module dependencies.
 */

var domain = process.env.DOMAIN || 'localhost:3000',
  port = process.env.PORT || 3000,
  rootUrl = 'http://' + domain,
  express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  passport = require('passport'),
  GooglePassport = require('passport-google-oauth').OAuth2Strategy,
  TwitterPassport = require('passport-twitter').Strategy,
  FacebookPassport = require('passport-facebook').Strategy,
  db = require('mongoskin').db('localhost:27017/codeTunnelDB');
  settings = {
    bannerText: process.env.BANNER_TEXT || 'Code.Tunnel();'
  };

// Configure passport
passport.use(new GooglePassport({
    clientID: process.env.GOOGLE_CLIENT_ID || 'fake_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'fake_client_secret',
    callbackURL: rootUrl + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    var user = {
      firstName: profile.displayName.split(' ')[0],
      lastName: profile.displayName.split(' ')[1],
      displayName: profile.displayName
    };
    done(null, user);
  }
));

passport.use(new TwitterPassport({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'fake_consumer_key',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'fake_consumer_secret',
    callbackURL: rootUrl + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    var user = {
      firstName: profile.displayName.split(' ')[0],
      lastName: profile.displayName.split(' ')[1],
      displayName: profile.displayName
    };
    done(null, user);
  }
));

passport.use(new FacebookPassport({
    clientID: process.env.FACEBOOK_APP_ID || 'fake_app_id',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'fake_app_secret',
    callbackURL: rootUrl + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      firstName: profile.displayName.split(' ')[0],
      lastName: profile.displayName.split(' ')[1],
      displayName: profile.displayName
    };
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('piano cat'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use (function (req, res, next) {
    settings.user = req.user;
    req.settings = settings;
    next();
  });
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.home);
app.get('/users', user.list);
app.get('/projects', routes.projects);
app.get('/about', routes.about);
app.get('/login', routes.login);
app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(port, function(){
  console.log("App is listening on port " + app.get('port'));
});