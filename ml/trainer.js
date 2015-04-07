var utilities = require('../utilites.js');
var readlineSync = require('readline-sync');

var LIB_PATH = '../trainingLibrary';

var trainer = {
  train: function(metaTags) {
    var trainedTag = utilities.metadataMap(metaTags, function(field, tag) {
       return readlineSync.question(field + ':' + tag + '\n' + field + ':');
    });
    return trainedTag;
  },

  trainLib: function() {
    
  }
}

module.exports = trainer;
