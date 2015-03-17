var utilities = {
	isMP3 : function(file) {
		return (typeof(file.split('.')[1]) !== 'undefined') && 
		file.substring(file.length - 3).toLowerCase() === 'mp3';
	},
}

module.exports = utilities;
