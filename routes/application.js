var homeController = require('../controllers/home');

exports.registerRoutes = function (app) {
  // Setup application routes.
  app.get('/', homeController.home);
  app.get('/about', homeController.about);
  app.get('/projects', homeController.projects);
};