var db = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB),
  markdown = require('node-markdown').Markdown;

exports.home = function(req, res){
  var viewModel = {
    posts: [
      { title: 'post 1' },
      { title: 'post 2' },
      { title: 'post 3' },
      { title: 'post 4' },
      { title: 'post 5' }
    ]
  };
  res.renderView('blog/index', viewModel);
};

exports.portfolio = function(req, res) {
  var viewModel = {
    title: 'My Portfolio',
    bannerText: 'My Portfolio'
  };
  res.renderView('blog/portfolio', viewModel);
};

exports.resume = function(req, res) {
  var viewModel = {
    title: 'Hire Me!',
    bannerText: 'Hire Me!'
  };
  res.renderView('blog/resume', viewModel);
};

exports.post = function (req, res) {
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
  var viewModel = {
    title: 'Edit Post',
    bannerText: 'Edit Post',
    blogPost: req.blogPost
  };
  res.renderView('blog/postForm', viewModel);
};

exports.savePost = function (req, res) {
  if (!req.param('postSlug')) {
    db.collection('blogPosts').insert({
      date: new Date(),
      author: req.user._id,
      title: req.param('postTitle'),
      slug: convertToSlug(req.param('postTitle')),
      content: req.param('postContent')
    },
    function (err, result) {
      if (err) return req.next(err);
      res.redirect('/blog/post/' + result[0].slug);
    });
  }
  else {
    var newSlug = convertToSlug(req.param('postTitle'));
    db.collection('blogPosts').update({ slug: req.param('postSlug') }, {
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
};

function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}