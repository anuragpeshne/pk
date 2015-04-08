var fs = require('fs');

var utilities = {
  isMP3 : function(file) {
    return (typeof(file.split('.')[1]) !== 'undefined') &&
    file.substring(file.length - 3).toLowerCase() === 'mp3';
  },

  interestingFields: ['title', 'artist', 'album', 'year', 'composer'],
  nestedFields: ['v1', 'v2'],

  calDifference: function(metadata1, metadata2) {
    var iiF;
    var diff = 0;

    for (iiF = 0; iiF < this.interestingFields.length; iiF++) {
      var field1 = metadata1[this.interestingFields[iiF]] || '';
      var field2 = metadata2[this.interestingFields[iiF]] || '';

      diff = diff + this.stringDiff(field1, field2);
    }

    var inf;
    for (inf = 0; inf < this.nestedFields.length; inf++) {
      if (typeof(metadata1[this.nestedFields[inf]]) !== 'undefined' ||
          typeof(metadata2[this.nestedFields[inf]]) !== 'undefined') {
        diff = diff + this.calDifference(metadata1[this.nestedFields[inf]],
                                        metadata2[this.nestedFields[inf]]);
      }
    }
    return diff;
  },

  stringDiff: function(string1, string2) {
    var i, j, diff;
    i = j = diff = 0;
    while(i < string1.length && j < string2.length) {
      if(string1.charAt(i) !== string2.charAt(j)) {
        diff++;
      }
      i++, j++;
    }

    return (string1.length - i
        + diff
        + string2.length - j
        );
  },

  metadataMap: function(metadata, callback) {
    if(typeof(metadata) === 'object') {
      var prop;
      for (prop in metadata) {
        if(metadata.hasOwnProperty(prop)) {
          if(typeof(metadata[prop]) === 'string')
            metadata[prop] = callback(prop, metadata[prop]);
          else if(typeof(metadata[prop]) === 'object')
            metadata[prop] = this.metadataMap(metadata[prop], callback);
        }
      }
    }
    return metadata;
  },

  hashify: function(str) {
    // TODO: google this
    return 'hashed';
  },

}

module.exports = utilities;
