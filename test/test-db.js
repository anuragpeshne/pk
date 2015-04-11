var db = require('../ml/db.js');

exports.connection = function(test) {
  db.connect(function(err, db) {
    test.equal(err, null);
    test.done();
  });
}

exports.updateTrainedTags = function(test) {
  db.updateTrainedTags({ _id : -112123 }, {'name': 'test2', 'id': -112123}, function(result) {
    test.equal(parseInt(result['result'].ok) > 0, true);
    console.log("test done");
    test.done();
  });
}
