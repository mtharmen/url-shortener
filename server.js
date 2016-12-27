var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/shortenerApp.js');
var app = express();

app.use('/', express.static(__dirname + '/app/styles'));
app.use('/new', express.static(__dirname + '/app/styles'));


// Document format
var urlSchema = mongoose.Schema({
    original: String,
    code: String
});
var urlDB = mongoose.model('urlDB', urlSchema);

// Connecting to database
mongoose.connect('mongodb://' + process.env.MONGOD_USER + ':' + process.env.MONGOD_PASSWORD + '@' + process.env.IP + ':' + process.env.PORT + '/url-shortener');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to url-shortener');
    
    routes(app, urlDB);
    
});



var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening on port ', port);
});

// Closes database when node server.js stops
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Closing connection to mongoose database'); 
    process.exit(0); 
  }); 
}); 
