var id3 = require('id3js');

var reader = {
	readTags : function(filePath, callback) {
		id3({ file : './trainingLibrary/02 Jeena Jeena.mp3', type: id3.OPEN_LOCAL }, 
				function(err, tags) {
					if(err) throw err;

					callback(tags);
				}
		);
	},

	readDir : function(dirPath) {
	
	}
}

module.exports = reader;
