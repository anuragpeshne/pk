var id3 = require('id3js');

var reader = {
  readTags : function(filePath, callback) {
    id3({ file : filePath, type: id3.OPEN_LOCAL },
        function(err, tags) {
          if(err) throw err;

          callback(tags);
        }
       );
  },

  readDir : function(dirPath) {

  }
}

module.exports = reader;
