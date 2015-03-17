var reader = require('./reader.js');
var cleaner = require('./cleaner.js');

var song = './trainingLibrary/1- Sooraj Dooba Hain - Roy - [Songspk.CC].mp3';
reader.readTags(song, function(tags) {
	console.log(cleaner.clean(tags));
});
