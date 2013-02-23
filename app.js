
/**
 * Module dependencies.
 */

var domain = process.env.DOMAIN,
  port = process.env.PORT,
  rootUrl = 'http://' + domain,
  express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  passport = require('passport'),
  GooglePassport = require('passport-google-oauth').OAuth2Strategy,
  TwitterPassport = require('passport-twitter').Strategy,
  FacebookPassport = require('passport-facebook').Strategy,
  db = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB);
  settings = {
    bannerText: process.env.BANNER_TEXT
  };

// Configure passport
passport.use(new GooglePassport({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: rootUrl + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    db.collection('users').findOne({ googleId: profile.id }, function (err, user) {
      if (!user) {
        user = {
          googleId: profile.id,
          name: {
            first: profile.displayName.split(' ')[0],
            last: profile.displayName.split(' ')[1]
          }
        };
        if (profile.emails.length > 0)
          user.email = profile.emails[0].value;
        db.collection('users').insert(user);
      }
      done(err, user);
    });
  }
));

passport.use(new TwitterPassport({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: rootUrl + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    db.collection('users').findOne({ twitterId: profile.id }, function (err, user) {
      if (!user) {
        user = {
          twitterId: profile.id,
          name: {
            first: profile.displayName.split(' ')[0],
            last: profile.displayName.split(' ')[1]
          }
        };
        db.collection('users').insert(user);
      }
      done(err, user);
    });
  }
));

passport.use(new FacebookPassport({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: rootUrl + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    db.collection('users').findOne({ facebookId: profile.id }, function (err, user) {
      if (!user) {
        user = {
          facebookId: profile.id,
          name: {
            first: profile.displayName.split(' ')[0],
            last: profile.displayName.split(' ')[1]
          }
        };
        if (profile.emails.length > 0)
          user.email = profile.emails[0].value;
        db.collection('users').insert(user);
      }
      done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  db.collection('users').findById(id, function (err, user) {
    done(err, user);
  });
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
app.get('/projects', routes.projects);
app.get('/about', routes.about);
app.get('/login', routes.login);
app.get('/user/create', routes.createUser);
app.post('/user/create', function (req, res) {
  db.collection('users').updateById(req.user._id, { $set: { email: req.body.email }});
  res.redirect('/');
});
app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/user/create', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/user/create', failureRedirect: '/login' }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/user/create', failureRedirect: '/login' }));
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(port, function(){
  console.log("App is listening on port " + port);
});