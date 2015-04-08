var MongoClient = require('mongodb').MongoClient;
/*
var url = 'mongodb://localhost:27017/pkProject';
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  db.close();
});
*/
var db = {
  insertTrainedTags: function(hash, tags) {
    //TODO: implement this:
    console.log("saved in db!");
  },

  insertCleanedName: function(hash, name) {
    //TODO: implement this:
    console.log("saved new name!");
  }
}

module.exports = db;
