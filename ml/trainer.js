var readlineSync = require('readline-sync');

var reader = require('../reader.js');
var utilities = require('../utilites.js');
var db = require('./db.js');

var trainer = {
  train: function(metaTags) {
    var trainedTag = utilities.metadataMap(metaTags, function(field, tag) {
       return readlineSync.question(field + ':' + tag + '\n' + field + ':');
    });
    return trainedTag;
  },

  trainLib: function(libPath) {
    var that = this;
    reader.readDir(libPath,
      function(song, tags) {
        var trainedTags = that.train(tags);
        db.insertTrainedTags(utilities.hashify(song), trainedTags);
      }, function(fileName) {
        return cleaner.cleanName(fileName);
      }, function(song, cleanFile) {
        db.insertCleanedName(utilities.hashify(song), cleanFile);
      }
    );
  }
}

module.exports = trainer;
