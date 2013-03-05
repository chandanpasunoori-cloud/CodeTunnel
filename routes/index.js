var blogRoutes = require('./blogRoutes'),
  userRoutes = require('./userRoutes'),
  socialAuthRoutes = require('./socialAuthRoutes');

exports.register = function (app) {
	blogRoutes.register(app);
	userRoutes.register(app);
	socialAuthRoutes.register(app);
};