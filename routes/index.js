
/*
 * GET home page.
 */

exports.home = function(req, res){
  req.settings.title = 'CodeTunnel.com';
  req.settings.posts = [
    { title: 'post 1' },
    { title: 'post 2' },
    { title: 'post 3' },
    { title: 'post 4' },
    { title: 'post 5' }
  ];
  var viewName = 'home/index';
  if (!req.isAjax)
    viewName += '_full';
  res.render(viewName, req.settings);
};

exports.projects = function(req, res) {
  req.settings.title = 'My Projects';
  var viewName = 'projects/index';
  if (!req.isAjax)
    viewName += '_full';
  res.render(viewName, req.settings);
};

exports.about = function(req, res) {
  req.settings.title = 'About Me';
  var viewName = 'about/index';
  if (!req.isAjax)
    viewName += '_full';
  res.render(viewName, req.settings);
};