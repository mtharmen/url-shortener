var express = require('express');
//var validUrl = require('valid-url');
var mongo = require('mongodb').MongoClient;

var app = express();

function generateCode() {
    return Math.floor(Math.random() * 10000).toString();
}

mongo.connect('mongodb://localhost:27017/url-shortener', function(err, db) {
    if (err) throw err;
    else { console.log('Connected to url-shortener.'); }
    
    var linksDB = db.collection('links');

    app.use('/', express.static(__dirname + '/styles'));
    app.use('/new', express.static(__dirname + '/styles'));
    
    app.get('/new/:url(*)', function(req, res){
        
        var inputURL = req.params.url;
        
        console.log('Beginning search');
        // Checking if entry already exists
        linksDB.find({ original: inputURL }, { original: 1, mini: 1, _id: 0 }).limit(1).toArray(function(err, documents) {
            
            if (err) throw err;
            
            // Found an Entry
            if (documents.length) {
                console.log('Found Entry: ' + JSON.stringify(documents[0]));
                res.json(documents[0]);
            }
            // Entry not Found
            else {
                console.log('Entry not found, creating new entry');
                
                var newLink = { original: inputURL, mini: generateCode() };
                
                // linksDB.insert(newLink, function(err, doc) {
                //     if (err) throw err;
                //     console.log('Added new entry: ' + JSON.stringify(newLink));
                //     res.json(newLink);
                // });
                res.json(newLink);
            }
        });
    });
    db.close();
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
})