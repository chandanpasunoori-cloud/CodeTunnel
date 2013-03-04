var db = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB, {
  auto_reconnect: true,
  poolSize: 3,
  socketOptions: {
    keepAlive: 1,
    timeout: 0,
    noDelay: true
  }
});

db.bind('blogPosts', {
  getPage: function(page, numItems, fn) {
    this.find({}, { skip: ((page - 1) * numItems), limit: numItems, sort: { date: -1 } }).toArray(fn);
  }
});

module.exports = db;