var db = require('../ml/db.js');

exports.connection = function(test) {
  db.connect(function(err, db) {
    test.equal(err, null);
    test.done();
  });
}

exports.insertTags = function(test) {
  db.insertTrainedTags(123, {'name': 'test'}, function(err, result) {
    test.equal(err, null);
    console.log("test done");
    test.done();
  });
}
