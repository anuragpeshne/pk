var fs = require('fs');
var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');

var trainingLib = './trainingLibrary';

var DEBUG = 0;

var processFile = function(song) {
  reader.readTags(trainingLib + '/' + song, function(tags) {
    var origTags = tags;
    var cleanedTags = cleaner.clean(tags);
    console.log(utilities.calDifference(origTags, cleanedTags));
  });
  return cleaner.cleanName(song);
}

fs.readdir(trainingLib, function(err, files) {
  if (typeof(process.argv[2]) !== 'undefined' &&
    process.argv[2].toLowerCase() === 'debug') {
    DEBUG = 1;
  }

  var newFiles = files.filter(utilities.isMP3)
                      .map(processFile);
  console.log(newFiles);
});

