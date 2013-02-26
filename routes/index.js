var blog = require('./blog'),
  user = require('./user'),
  socialAuth = require('./socialAuth');

exports.register = function (app) {
  blog.registerRoutes(app);
  user.registerRoutes(app);
  socialAuth.registerRoutes(app);
};