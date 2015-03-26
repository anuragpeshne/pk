var utilities = {
  isMP3 : function(file) {
    return (typeof(file.split('.')[1]) !== 'undefined') && 
    file.substring(file.length - 3).toLowerCase() === 'mp3';
  },

  interestingFields: ['title', 'artist', 'album', 'year', 'composer'],

  calDifference: function(metadata1, metadata2) {
    var iiF, diff = 0;
    for(iiF = 0; iiF < this.interestingFields.length; iiF++) {
      var field1 = metadata1[this.interestingFields[iiF]] || '';
      var field2 = metadata2[this.interestingFields[iiF]] || '';

      diff = diff + this.stringDiff(field1, field2);
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
}

module.exports = utilities;
