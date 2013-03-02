module.exports = function (req, res, next) {
	if (req.user.author) next();
	else next(new Error('Unauthorized'));
};