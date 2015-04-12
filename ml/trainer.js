var readlineSync = require('readline-sync');

var reader = require('../reader.js');
var utilities = require('../utilites.js');
var cleaner = require('../cleaner.js');
var db = require('./db.js');

var trainer = {
  train: function(metaTags) {
    var trainedTag = JSON.parse(JSON.stringify(metaTags));
    trainedTag = utilities.metadataMap(trainedTag, function(field, tag) {
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
        console.log("updating ....");
        db.updateOrigTags(utilities.hashify(song), tags);
        db.updateOrigName(utilities.hashify(song), song);
        db.updateTrainedTags(utilities.hashify(song), trainedTags);
      }, function(fileName) {
        var cleanedName = cleaner.cleanName(fileName);
        db.updateTrainedName(utilities.hashify(fileName), cleanedName);
        return cleanedName;
      }
    );
  },

  evalDb: function(evalFunction) {
    var that = this;
    db.find({},     //for all songs
      function(song) {
        db.updateTagScore(
          song._id,
          utilities.calDifference(cleaner.clean(song.origTags), song.trainedTags),
          function() {}
        );
      }
    );
  },
}

module.exports = trainer;
