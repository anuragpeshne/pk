var fs = require('fs');
var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');

var trainingLib = './trainingLibrary';

fs.readdir(trainingLib, function(err, files) {
	var newFiles = files.filter(utilities.isMP3)
											.map(function(song) {
												reader.readTags(trainingLib + '/' + song,
													function(tags) {
														console.log( cleaner.clean(tags));
													});
												return cleaner.cleanName(song);
											});
	console.log(newFiles);
});

