exports.home = function(req, res){
  var viewModel = {
    posts: [
      { title: 'post 1' },
      { title: 'post 2' },
      { title: 'post 3' },
      { title: 'post 4' },
      { title: 'post 5' },
      { title: 'post 6' },
      { title: 'post 7' },
      { title: 'post 8' },
      { title: 'post 9' },
      { title: 'post 10' }
    ]
  };
  res.renderView('blog/index', viewModel);
};

exports.projects = function(req, res) {
  var viewModel = {
    title: 'My Projects'
  };
  res.renderView('projects/index', viewModel);
};

exports.about = function(req, res) {
  var viewModel = {
    title: 'About Me'
  };
  res.renderView('blog/about', viewModel);
};

exports.newPost = function (req, res) {
  var viewModel = {
    title: 'New Post',
    bannerText: 'New Post'
  };
  res.renderView('blog/postForm')
};