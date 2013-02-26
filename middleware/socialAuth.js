var rootUrl = 'http://' + process.env.DOMAIN,
  passport = require('passport'),
  GooglePassport = require('passport-google-oauth').OAuth2Strategy,
  TwitterPassport = require('passport-twitter').Strategy,
  FacebookPassport = require('passport-facebook').Strategy,
  db = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB);

exports.config = function () {
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
};