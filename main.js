var fs = require('fs');

var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');
var trainer = require('./ml/trainer.js');

var trainingLib = './trainingLibrary';

var DEBUG = 0;

if (typeof(process.argv[2]) !== 'undefined' &&
    process.argv[2].toLowerCase() === 'debug') {
  DEBUG = 1;
  console.log("***DEBUG MODE***");

  reader.readDir( trainingLib, function(tags) {
    var origTags = tags;
    var cleanedTags = cleaner.clean(tags);
    console.log(utilities.calDifference(origTags, cleanedTags));
  }, function(fileName) {
    return cleaner.cleanName(fileName);
  }, function(cleanFile) {
    console.log(cleanFile);
  })

} else {
    console.log('***PROD MODE***');
}
