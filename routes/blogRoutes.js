var blogController = require('../controllers/blogController'),
	db = require('../db'),
	authorizeUser = require('./authorizeUser');

exports.register = function (app) {
	// Bind post
	app.param('slug', function (req, res, next, slug) {
		db.collection('blogPosts').findOne({ slug:slug }, function (err, blogPost) {
			if (err) next(err);
			else if (blogPost) req.blogPost = blogPost;
			next();
		});
	});

	// Setup application routes.
	app.get('/', blogController.home);
	app.get('/resume', blogController.resume);
	app.get('/portfolio', blogController.portfolio);
	app.get('/blog/post/new', authorizeUser, blogController.newPost);
	app.get('/blog/post/:slug', blogController.post);
	app.get('/blog/post/:slug/edit', authorizeUser, blogController.editPost);
	app.post('/blog/post/create', authorizeUser, blogController.createPost);
	app.post('/blog/post/:slug/update', authorizeUser, blogController.updatePost);
};