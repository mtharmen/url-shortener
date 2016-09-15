var express = require('express');
var mongo = require('mongodb').MongoClient;

var app = express();
var url = 'mongodb://localhost:27017/url-shortener';

function generateCode() {
    return Math.floor(Math.random() * 10000).toString();
}

app.use('/', express.static(__dirname + '/styles'));
app.use('/new', express.static(__dirname + '/styles'));

app.get('/new/:url(*)', function(req, res){
    
    var inputURL = req.params.url;

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        else console.log('Connected to url-shortener.');

        db.close();
        res.send(inputURL);
    });

});

app.listen(8080, function() {
    console.log('Listening on port 8080');
})