var utilities = require('./utilites.js');

var cleaner = {
  siteNameRE : /[ -]*\[?(?:http:\/\/)?(?:www\.)?\w+\.\w+\]?/,
  fileNamePrefixRE: /^(?:\d{2} )/,
  mp3RE: /\.mp3$/,

  clean: function(origObj) {
    // Since we are mutating members, we better duplicate the obj and work on it
    // This is a fast method to clone obj
    obj = JSON.parse(JSON.stringify(origObj));

    var that = this;
    utilities.metadataMap(obj, function(obj) {
      return that.regexCleaner(obj);
    });
    return obj;
  },

  regexCleaner: function(tag) {
    return tag.replace(this.mp3RE, '').replace(this.siteNameRE, '').trim();
  },
  cleanName : function(fileName) {
    return fileName.substring(0, fileName.length - 4)           // remove extension
                   .replace(this.siteNameRE, '')
                   .replace(this.fileNamePrefixRE, '')
                   .trim() +
                   fileName.substring(fileName.length - 4); //put extension back
  }
}

module.exports = cleaner;
