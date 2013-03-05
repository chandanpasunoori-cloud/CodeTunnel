var db = require('../db');

exports.home = function (req, res) {
	var currentPage = parseInt(req.param('page')) || 1;
	db.collection('blogPosts').getPage(currentPage, 5, function (err, page) {
		if (err) req.next(err);
		// If current page is greater than the total number of pages then show 404
		if (currentPage > page.totalPages) req.next();
		var viewModel = {
			totalPages: page.totalPages,
			currentPage: currentPage,
			blogPosts: page.blogPosts
		};
		res.renderView('blog/index', viewModel);
	});
};

exports.portfolio = function (req, res) {
	var viewModel = {
		title: 'My Portfolio',
		bannerText: 'My Portfolio'
	};
	res.renderView('blog/portfolio', viewModel);
};

exports.resume = function (req, res) {
	var viewModel = {
		title: 'Hire Me!',
		bannerText: 'Hire Me!'
	};
	res.renderView('blog/resume', viewModel);
};

exports.post = function (req, res) {
	if (!req.blogPost) req.next();
	var viewModel = {
		blogPost: req.blogPost
	};
	res.renderView('blog/post', viewModel);
};

exports.newPost = function (req, res) {
	var viewModel = {
		title: 'New Post',
		bannerText: 'New Post',
		blogPost: false
	};
	res.renderView('blog/postForm', viewModel);
};

exports.editPost = function (req, res) {
	if (!req.blogPost) req.next();
	var viewModel = {
		title: 'Edit Post',
		bannerText: 'Edit Post',
		blogPost: req.blogPost
	};
	res.renderView('blog/postForm', viewModel);
};

exports.createPost = function (req, res) {
	// Create slug from title.
	var slug = convertToSlug(req.param('postTitle'));

	// Slugs must be unique so check if a post exists with the new slug.
	db.collection('blogPosts').findOne({ slug: slug }, function (err, blogPost) {
		if (err) return req.next(err);

		// If no blog post exists with the new slug then insert new blog post.
		if (!blogPost) {
			db.collection('blogPosts').insert({
				  date: new Date(),
				  author: req.user._id,
				  title: req.param('postTitle'),
				  slug: slug,
				  content: req.param('postContent')
			  },
			  function (err, result) {
				  if (err) return req.next(err);
				  res.redirect('/blog/post/' + slug);
			  });
		}
		else {
			res.next(new Error('Blog post already exists with that slug. Change your title.'));
		}
	});
};

exports.updatePost = function (req, res) {

	if (req.param('deletePost')) {
		db.collection('blogPosts').remove({ slug: req.param('slug') });
		return res.redirect('/');
	}

	// Create slug from title.
	var newSlug = convertToSlug(req.param('postTitle'));

	// Slugs must be unique so check if a post exists with the new slug.
	db.collection('blogPosts').findOne({ slug: newSlug }, function (err, blogPost) {
		if (err) return req.next(err);

		if (!blogPost || newSlug === req.blogPost.slug) {
			db.collection('blogPosts').update({ slug: req.blogPost.slug }, {
				  $set: {
					  editDate: new Date(),
					  title: req.param('postTitle'),
					  slug: newSlug,
					  content: req.param('postContent')
				  }
			  },
			  function (err) {
				  if (err) return req.next(err);
				  res.redirect('/blog/post/' + newSlug);
			  });
		}
		else {
			res.next(new Error('Blog post already exists with that slug. Change your title.'));
		}
	});
};

exports.createComment = function (req, res) {
	if (!req.blogPost) req.next();
	if (!req.blogPost.comments) req.blogPost.comments = [];
	req.blogPost.comments.push({
		_id: req.blogPost.comments.length,
		author: req.user._id,
		content: req.param('commentContent')
	});
	db.collection('blogPosts').updateById(req.blogPost._id, req.blogPost, function (err, results) {
		if (err) req.next(err);
		res.redirect('/blog/post/' + req.blogPost.slug);
	});
};

exports.deleteComment = function (req, res) {
	if (!req.blogPost || !req.blogPost.comments) req.next();
	blogPost.comments.remove(req.comment);
	db.collection('blogPosts').updateById(req.blogPost._id, req.blogPost, function (err, results) {
		if (err) req.next(err);
		res.redirect('/blog/post/' + req.blogPost.slug);
	});
};

function convertToSlug(text) {
	return text
	  .toLowerCase()
	  .replace(/[^\w ]+/g, '')
	  .replace(/ +/g, '-');
}