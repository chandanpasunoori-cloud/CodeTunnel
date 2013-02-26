exports.login = function(req, res) {
  req.settings.title = 'Authenticate';
  var viewName = 'user/login';
  if (!req.xhr)
    viewName += '_full';
  res.render(viewName, req.settings);
};

exports.profile = function(req, res) {
  req.settings.title = 'Create User';
  if (!req.user.email)
    res.render('user/create', req.settings);
  else
    res.redirect('/');
};

exports.create = function(req, res) {
  db.collection('users').updateById(req.user._id, { $set: { email: req.body.email }});
  res.redirect('/');
};