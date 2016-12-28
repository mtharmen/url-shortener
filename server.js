require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var app = express();

// Document format
var urlSchema = mongoose.Schema({
    original: String,
    code: String
});
var urlDB = mongoose.model('urlDB', urlSchema);

// Connecting to database
mongoose.Promise = global.Promise;

// var mongodbUrl = 'mongodb://' + process.env.MONGOD_USER + ':' + process.env.MONGOD_PASSWORD + '@' + process.env.IP + ':' + process.env.PORT + '/mthar-url-shortener'
var mongodbUrl = process.env.MONGODB_URI + '/mthar-url-shortener'

console.log(process.env.PORT)
console.log(mongodbUrl)

mongoose.connect(mongodbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mthar-url-shortener');    
});

app.use('/', express.static(__dirname + '/app/styles'));
app.use('/new', express.static(__dirname + '/app/styles'));
require('./app/routes/shortenerApp.js')(app, urlDB);

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

// Closes database when node server.js stops
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Closing connection to mongoose database'); 
    process.exit(0); 
  }); 
}); 
