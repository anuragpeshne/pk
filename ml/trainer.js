var readlineSync = require('readline-sync');

var reader = require('../reader.js');
var utilities = require('../utilites.js');
var cleaner = require('../cleaner.js');
var db = require('./db.js');

var trainer = {
  train: function(metaTags) {
    var trainedTag = utilities.metadataMap(metaTags, function(field, tag) {
       var ip = readlineSync.question(field + ':' + tag + '\n' + field + ':');
       return (ip === '*') ? tag : ip;
    });
    return trainedTag;
  },

  trainLib: function(libPath) {
    var that = this;
    reader.readDir(libPath,
      function(song, tags) {
        console.log('Now Training:', song);
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
