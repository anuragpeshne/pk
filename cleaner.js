var cleaner = {
  siteNameRE : /[ -]*\[?(?:http:\/\/)?(?:www\.)?\w+\.\w+\]?/,
  fileNamePrefixRE: /^(?:\d{2} )/,
  clean: function(obj) {
    if(typeof(obj) === 'object') {
      var prop;
      for (prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          if(typeof(obj[prop]) === 'string')
            obj[prop] = this.regexCleaner(obj[prop]);
          else if(typeof(obj[prop]) === 'object')
            this.clean(obj[prop]);
        }
      }
    }
    return obj;
  },

  regexCleaner: function(tag) {
    return tag.replace(this.siteNameRE, '').trim();
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
