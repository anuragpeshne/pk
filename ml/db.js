var MongoClient = require('mongodb').MongoClient;

var db = {
  connect: function(callback) {
    var url = 'mongodb://localhost:27017/pkProject';
    MongoClient.connect(url, function(err, db) {
      callback(err, db, function() {
        console.log("close db");
        db.close();
      });
    });
  },

  insertTrainedTags: function(hash, tags, insertDone) {
    this.connect(function(err, db, connectionDone) {
      if (err) throw err;

      var TrainingTags = db.collection('TrainingTags');
      TrainingTags.insert({
        _id: hash,
        trainedTags: tags
      }, function(err, result) {
        connectionDone(err, result);
        insertDone();
      });
    });
  },

  insertCleanedName: function(hash, name) {
    //TODO: implement this:
    console.log("saved new name!", name);
  }
}

module.exports = db;
