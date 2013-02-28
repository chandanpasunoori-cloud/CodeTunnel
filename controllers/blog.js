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
  setTimeout(function () {
    res.renderView('blog/resume', viewModel);
  }, 5000);
  //res.renderView('blog/about', viewModel);
};

exports.newPost = function (req, res) {
  var viewModel = {
    title: 'New Post',
    bannerText: 'New Post'
  };
  res.renderView('blog/postForm', viewModel)
};