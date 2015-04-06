var utilities = require('../utilites.js');
var readlineSync = require('readline-sync');

var trainer = {
  train: function(metaTags) {
    var trainedTag = utilities.metadataMap(metaTags, function(field, tag) {
       return readlineSync.question(field + ':' + tag + '\n' + field + ':');
    });
    return trainedTag;
  },
}

module.exports = trainer;


//I tried to implement asynchronous file read, but we need to iterate over an
//object. I think its time to move to synchronous read function.
