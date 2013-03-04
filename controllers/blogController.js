var db = require('../db'),
  markdown = require('node-markdown').Markdown;

exports.home = function (req, res) {
    db.collection('blogPosts').getPage(req.param('page') || 1, 3, function (err, blogPosts) {
        if (err) req.next(err);
        blogPosts.forEach(function (blogPost) {
            db.collection('users').findOne({ _id: blogPost.author }, function (err, user) {
                if (err) req.next(err);
                blogPost.author = user;
            });
        });
        var viewModel = {
            posts: blogPosts
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
    viewModel.blogPost.content = markdown(viewModel.blogPost.content);
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

function convertToSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
}