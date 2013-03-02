module.exports = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB, {
	auto_reconnect: true,
	poolSize: 3,
	socketOptions: {
		keepAlive: 1,
		timeout: 0,
		noDelay: true
	}
});