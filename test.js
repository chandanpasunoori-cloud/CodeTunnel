var db = require('mongoskin').db('localhost:27017/rockband');

var bands = db.collection('bands');

bands.find().toArray(function(err, result) {
  console.log(result);
  db.close();
});