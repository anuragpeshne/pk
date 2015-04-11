var fs = require('fs');
var id3 = require('id3js');

var utilities = require('./utilites.js');

var reader = {
  readTags : function(dirPath, song, callback) {
    var filePath = dirPath + '/' + song;
    id3({ file : filePath, type: id3.OPEN_LOCAL },
        function(err, tags) {
          if(err) throw err;

          callback(song, tags);
        }
       );
  },

  readDir : function(dirPath, processTags, processFileName, callback) {
    var that = this;
    fs.readdir(dirPath, function(err, files) {
      var newFiles = files
                     .filter(utilities.isMP3)
                     .map(function(song){
                       that.readTags(dirPath, song, processTags);
                       return processFileName(song);
                     });
      if (typeof(callback) !== 'undefined')
        callback(newFiles);
    });
  },
}

module.exports = reader;
