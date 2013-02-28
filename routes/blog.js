var blogController = require('../controllers/blog');

exports.registerRoutes = function (app) {
  // Setup application routes.
  app.get('/', blogController.home);
  app.get('/resume', blogController.resume);
  app.get('/portfolio', blogController.portfolio);
  app.get('/blog/post/new', blogController.newPost);
};