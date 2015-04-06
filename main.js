var fs = require('fs');
var readline = require('readline');

var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');
var trainer = require('./ml/trainer.js');

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
      console.log("*DEBUG MODE*");

      var sampleTags = [{
        version: [ 3, 0 ],
        title: 'Kaise Bataaoon [SongsKing.iN].mp3',
        artist: 'SongsKing.iN - Get Letest Free Songs Download',
        album: 'www.SongsKing.in',
        genre: 'SongsKing.iN',
        comments: 'Get Letest Songs by SongsKing.iN',
        image: { type: 'other',
          mime: 'image/jpeg',
          description: 'SongsKingArt.jpg',
        }
      }]; 
      var trainedTags = trainer.train(sampleTags);
      console.log(trainedTags);

    } else {
      var newFiles = files.filter(utilities.isMP3)
                      .map(processFile);
      console.log(newFiles);
  }
});

