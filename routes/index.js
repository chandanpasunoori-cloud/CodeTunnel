
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.settings.title = 'CodeTunnel.com';
  res.render('index', req.settings);
};