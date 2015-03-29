var fs = require('fs');
var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');

var trainingLib = './trainingLibrary';

fs.readdir(trainingLib, function(err, files) {
  var newFiles = files.filter(utilities.isMP3)
                      .map(function(song) {
                        reader.readTags(trainingLib + '/' + song,
                          function(tags) {
                            var origTags = tags;
                            var cleanedTags = cleaner.clean(tags);
                            console.log(utilities.calDifference(origTags,
                                cleanedTags));
                          });
                        return cleaner.cleanName(song);
                      });
  console.log(newFiles);
});

