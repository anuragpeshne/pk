var trainer = require('../ml/trainer.js');

exports.trainer = function(test) {
  var sampleTag = {
    title: 'Kaise Bataaoon [SongsKing.iN].mp3',
    artist: 'SongsKing.iN - Get Letest Free Songs Download',
    album: 'www.SongsKing.in',
    genre: 'SongsKing.iN',
    comments: 'Get Letest Songs by SongsKing.iN',
    image: { type: 'other',
      mime: 'image/jpeg',
      description: 'SongsKingArt.jpg',
    }
  };
  var trainedTag = trainer.train(sampleTag);
  for (prop in sampleTag) {
    if (sampleTag.hasOwnProperty(prop)) {
      test.equal( typeof(trainedTag[prop]) !== 'undefined', true);
    }
  }
  test.done();
}
