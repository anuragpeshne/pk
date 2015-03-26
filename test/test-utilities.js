var utilities = require('../utilites.js');

exports.stringDiff = function(test) {
  test.equal(utilities.stringDiff('abc', 'abd'), 1);
  test.equal(utilities.stringDiff('apple', 'apple juice'), 6);
  test.equal(utilities.stringDiff('apple', 'orange'), 6);
  test.done();
};

exports.calDiff = function(test) {
  var origMetaData = {
    version: [ 3, 0 ],
    title: 'Kaise Bataaoon [SongsKing.iN].mp3',
    artist: 'SongsKing.iN - Get Letest Free Songs Download',
    album: 'www.SongsKing.in',
    genre: 'SongsKing.iN',
    comments: 'Get Letest Songs by SongsKing.iN',
    image: { type: 'other',
      mime: 'image/jpeg',
      description: 'SongsKingArt.jpg',
      data: [Object] 
    }  
  };

  var expectedMetaData = {
    version: [ 3, 0 ],
    title: 'Kaise Bataaoon',
    artist: '',
    album: '',
    genre: '',
    comments: '',
    image: { type: 'other',
      mime: 'image/jpeg',
      description: 'SongsKingArt.jpg',
      data: [Object] 
    }  
  }
  test.equal(utilities.calDifference(origMetaData, expectedMetaData), 80);
  test.done();
};
