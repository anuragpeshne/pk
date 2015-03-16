var cleaner = {
	clean: function(tags) {
		console.log(tags)
		var tag;
		for (tag in tags) {
			if(tags.hasOwnProperty(tag)) {
				if(typeof(tags[tag]) === 'object') {
					this.clean(tags[tag]);
				} else if(typeof(tags[tag]) == 'string') {
					tags[tag] = this.regexCleaner(tags[tag]);
				} else
					;//console.log(typeof(tags[tag]));
			}
		}
		return tags;
	},

	regexCleaner: function(tag) {
		var siteRE = /(?:www)?.\w+.\w+/;
		console.log('as' + tag);
		return tag.replace(siteRE, '');
	}
}

module.exports = cleaner;
