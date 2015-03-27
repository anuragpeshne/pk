var cleaner = require('../cleaner.js');
var utilities = require('../utilites.js');


exports.clean = function(test) {
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
 
  var processedMetaData = cleaner.clean(origMetaData);

  var i, origMetaField, processedMetaField;
  for (i = 0; i < utilities.interestingFields.length; i++) {
    origMetaField = origMetaData[utilities.interestingFields[i]] || '';
    processedMetaField = processedMetaData[utilities.interestingFields[i]] || '';

    test.equal(processedMetaField, cleaner.regexCleaner(origMetaField));
  }

  test.done();
}


exports.regexCleaner = function(test) {
  var impureStrings = [
    'Good String www.site.com',
    '[site.in] Good String',
    'site.in Good String',
  ];

  var cleanedStrings = impureStrings.map(function(str) {
    return cleaner.regexCleaner(str);
  });

  var i;
  for (i = 0; i < cleanedStrings.length; i++) {
    test.equal(cleanedStrings[i], 'Good String');
  }
  test.done();
}
