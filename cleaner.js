var cleaner = {
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
		var siteRE = /\[?(?:www\.)?\w+\.\w+\]?/;
		return tag.replace(siteRE, '').trim();
	}
}

module.exports = cleaner;
