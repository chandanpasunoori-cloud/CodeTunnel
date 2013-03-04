module.exports = function (req, res, next) {
	if (req.user && req.user.author) next();
	else next(new Error('You are not authorized to access this area.'));
};