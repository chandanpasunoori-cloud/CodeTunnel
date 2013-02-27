var blogController = require('../controllers/blog');

exports.registerRoutes = function (app) {
  // Setup application routes.
  app.get('/', blogController.home);
  app.get('/about', blogController.about);
  app.get('/projects', blogController.projects);
  app.get('/blog/post/new', blogController.newPost);
};