var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/pkProject';
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");

	db.close();
});
