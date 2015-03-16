var reader = require('./reader.js');
var cleaner = require('./cleaner.js');

reader.readTags('./trainingLibrary/02 Jeena Jeena.mp3', function(tags) {
	(cleaner.clean(tags));
});
