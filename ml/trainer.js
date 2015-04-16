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
          utilities.calDifference(
            cleaner.clean(song.origTags),
            song.trainedTags
          ),
          function() {}
        );
      }
    );
  },

  strDiff: function(str1, str2) {
    if (str2.length > str1.length)
      return this.strDiff(str2, str1);

    var matchPoint = str1.search(str2);
    return {
      prefix: str1.substring(0, matchPoint),
      suffix: str1.substring(matchPoint + str2.length, str1.length)
    }
  },

  populateSuffixes: function(interestingFields, operationDone) {
    var selectProp = interestingFields.reduce(function (prev, cur) {
      prev[cur] = 1;
      return prev;
    }, {});
    var that = this;

    db.find(
      {},   //for all songs
      { origName: 1, origTags: 1, trainedTags: 1 },
      function(song) {
        var i;
        for (i = 0; i < interestingFields.length; i++) {
          if (typeof song.origTags[interestingFields[i]] !== 'undefined') {
            var diff = that.strDiff (
              song.origTags[interestingFields[i]],
              song.trainedTags[interestingFields[i]]
            );

            if (diff.prefix != '' || diff.suffix != '') {
              db.updateDiff(
                utilities.hashify(song.origName),
                interestingFields[i],
                diff
              );
            }
          }
        }
      }
    );
  },


}

module.exports = trainer;
