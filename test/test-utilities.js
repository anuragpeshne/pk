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
    }
  }
  test.equal(utilities.calDifference(origMetaData, expectedMetaData), 80);

  delete(origMetaData.artist);
  delete(expectedMetaData.artist);
  test.equal(typeof(utilities.calDifference(origMetaData, expectedMetaData)),
    'number');
  test.done();
};

exports.metadataMap = function(test) {
  var origMetada = {
    title: 'Kaise Bataaoon',
    album: '',
    artist: '',
    year: '2013',
    v1: { title: 'Kaise Bataaoon.',
      artist: '',
      album: '',
      year: '2013',
      comment: 'Get Letest Songs by SongsKing.',
      track: null,
      genre: null },
    v2: {
      title: 'Kaise Bataaoon',
      artist: '- Get Letest Free Songs Download',
      album: '',
      genre: '',
      comments: 'Get Letest Songs by',
      image: { type: 'other',
        mime: 'image/jpeg',
        description: '',
      }
    }
  }
  var expectedMetaData = {
    title: '',
    album: '',
    artist: '',
    year: '',
    v1: { title: '',
      artist: '',
      album: '',
      year: '',
      comment: '',
      track: null,
      genre: null },
    v2: {
      title: '',
      artist: '',
      album: '',
      genre: '',
      comments: '',
      image: { type: '',
        mime: '',
        description: '',
      }
    }
  }

  var calMetadata = utilities.metadataMap(origMetada, function(metaTag) {
    return '';
  });

  test.equal(JSON.stringify(calMetadata), JSON.stringify(expectedMetaData));
  test.done();
};

exports.hashify = function(test) {
  test.notEqual(utilities.hashify('test string').length, 0);
  test.notEqual(utilities.hashify('random string'), utilities.hashify('str'));
  test.done();
}
