var application = require('./application'),
  user = require('./user'),
  socialAuth = require('./socialAuth');

exports.register = function (app) {
  application.registerRoutes(app);
  user.registerRoutes(app);
  socialAuth.registerRoutes(app);
};