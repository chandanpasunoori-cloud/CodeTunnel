var async = require('async'),
  db = require('mongoskin').db(process.env.CUSTOMCONNSTR_MONGODB, {
  auto_reconnect: true,
  poolSize: 3,
  socketOptions: {
    keepAlive: 1,
    timeout: 0,
    noDelay: true
  }
});

db.bind('blogPosts', {
  getPost: function (slug, fn) {
      this.findOne({ slug: slug }, function (err, blogPost) {
          if (err) fn(err);
          db.collection('users').findOne({ _id: blogPost.author }, function (err, user) {
              if (err) fn(err);
              blogPost.author = user;
              fn(null, blogPost);
          })
      });
  },
  getPage: function(page, itemsPerPage, fn) {
    this.find({}, { skip: ((page - 1) * itemsPerPage), limit: itemsPerPage, sort: { date: -1 } }).toArray(function (err, blogPosts) {
        if (err) fn(err);
        var addUsersArray = [];
        blogPosts.forEach(function (blogPost) {
            addUsersArray.push(function (callback) {
                db.collection('users').findOne({ _id: blogPost.author }, function (err, user) {
                    if (err) callback(err);
                    blogPost.author = user;
                    callback(null, blogPost);
                });
            });
        });
        async.parallel(addUsersArray, function (err, blogPosts) {
            if (err) fn(err);
            db.collection('blogPosts').count(function (err, totalPosts) {
                if (err) fn(err);
                fn(null, {
                    totalPages: Math.ceil(totalPosts / itemsPerPage),
                    blogPosts: blogPosts
                });
            });
        });
    });
  }
});

module.exports = db;