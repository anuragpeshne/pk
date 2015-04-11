var MongoClient = require('mongodb').MongoClient;

var db = {
  connect: function(callback) {
    var url = 'mongodb://localhost:27017/pkProject';
    MongoClient.connect(url, function(err, db) {
      callback(err, db, function(err, result) {
        if (err)
          console.log(err);
        else
          console.log("SUCCESS: closing db");
        db.close();
      });
    });
  },

  updateDb: function(hash, updateItem, operationDone) {
    hash = {_id : hash};
    updateItem = { $set: updateItem };
    this.connect(function(err, db, connectionDone) {
      if (err) console.log(err);

      var TrainingTags = db.collection('TrainingTags');
      TrainingTags.update(
        hash,
        updateItem,
        { upsert: true },
        function(err, result) {
          connectionDone(err, result);
          if (typeof(operationDone) !== 'undefined') {
            operationDone(result);
          }

        }
      );
    });

  },

  updateTrainedTags: function(hash, tags, operationDone) {
    this.updateDb(hash, { trainedTags: tags }, operationDone);
  },

  updateTrainedName: function(hash, name, operationDone) {
    this.updateDb(hash, { trainedName: name }, operationDone);
  },

  updateOrigTags: function(hash, tags, operationDone) {
    this.updateDb(hash, { origTags: tags }, operationDone);
  },

  updateOrigName: function(hash, name, operationDone) {
    this.updateDb(hash, { origName: name}, operationDone);
  },
}

module.exports = db;
