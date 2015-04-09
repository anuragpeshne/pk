var fs = require('fs');

var reader = require('./reader.js');
var cleaner = require('./cleaner.js');
var utilities = require('./utilites.js');
var trainer = require('./ml/trainer.js');

var trainingLib = './trainingLibrary';

var DEBUG = 0;

if (typeof(process.argv[2]) !== 'undefined' &&
    process.argv[2].toLowerCase() === 'debug') {
  DEBUG = 1;
  console.log("***DEBUG MODE***");

  trainer.trainLib(trainingLib);
} else {
    console.log('***PROD MODE***');
}
