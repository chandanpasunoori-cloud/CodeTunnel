exports.login = function (req, res) {
	var viewModel = {
		title: 'Authenticate'
	};
	res.renderView('user/login', viewModel);
};

exports.profile = function (req, res) {
	var viewModel = {
		title: 'Create User'
	};
	if (!req.user.email)
		res.render('user/create', viewModel);
	else
		res.redirect('/');
};

exports.create = function (req, res) {
	db.collection('users').updateById(req.user._id, { $set: { email: req.body.email }});
	res.redirect('/');
};