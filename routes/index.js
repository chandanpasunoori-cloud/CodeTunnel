
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.settings.title = 'CodeTunnel.com';
  req.settings.posts = [
    { title: 'post 1' },
    { title: 'post 2' },
    { title: 'post 3' },
    { title: 'post 4' },
    { title: 'post 5' }
  ];
  res.render('index', req.settings);
};