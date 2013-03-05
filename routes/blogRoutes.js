var blogController = require('../controllers/blogController'),
  db = require('../db'),
  authorize = require('./authorize');

exports.register = function (app) {
	// Bind post
	app.param('slug', function (req, res, next, slug) {
		db.collection('blogPosts').getPost(slug, function (err, blogPost) {
			if (err) next(err);
			else if (blogPost) req.blogPost = blogPost;
			next();
		});
	});

	app.param('commentId', function (req, res, next, commentId) {
		if (!req.blogPost || !req.blogPost.comments) return next();
		req.blogPost.comments.forEach(function (comment) {
			if (comment._id.toString() === commentId.toString()) {
				req.comment = comment;
				next();
			}
		});
	});

	// Setup blog routes.
	app.get('/resume', blogController.resume);
	app.get('/portfolio', blogController.portfolio);
	app.get(/^(?:\/(?:blog\/)?page(\d+))?\/?$/, function (req, res) {
		// Set named parameter to first capture group. Express, you need to figure this out >:(
		req.params.page = req.params[0];
		blogController.home(req, res);
	});
	app.get('/blog/post/new', authorize.isPostAuthor, blogController.newPost);
	app.get('/blog/post/:slug', blogController.post);
	app.get('/blog/post/:slug/edit', authorize.isPostAuthor, blogController.editPost);
	app.post('/blog/post/create', authorize.isPostAuthor, blogController.createPost);
	app.post('/blog/post/:slug/update', authorize.isPostAuthor, blogController.updatePost);
	app.post('/blog/post/:slug/comment/create', authorize.isAuthenticated, blogController.createComment);
	app.post('/blog/post/:slug/comment/:commentId/delete', authorize.isCommentAuthor, blogController.deleteComment);
};