var express = require('express');
var mongo = require('mongodb').MongoClient;

var app = express();
var url = 'mongodb://localhost:27017/url-shortener';

function generateCode() {
    return Math.floor(Math.random() * 10000).toString();
}

function newURL(database, url) {
    var newLink = { original: url, mini: generateCode() };
    
    database.insert(newLink, function(err, doc) {
    
         if (err) throw err;
        
         console.log('Added new entry:\n' + JSON.stringify(newLink));
         return newLink
    });
}


app.use('/', express.static(__dirname + '/styles'));
app.use('/new', express.static(__dirname + '/styles'));

app.get('/new/:url(*)', function(req, res){
    
    var inputURL = req.params.url;
    var miniObj = {};

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        else console.log('Connected to url-shortener.');
          
        var linksDB = db.collection('links');
        
        linksDB.remove({});
        
        // // Checking if it already exists
        // linksDB.find({ original: inputURL }).limit(1).toArray(function(err, doc){
        //     if (err) throw err;
            
        //     miniObj = { original: inputURL, mini: doc[0].mini };
        //     console.log(JSON.stringify(miniObj));
            
        //     // Found
        //     if (miniObj) {
        //         console.log('Found:');
        //         console.log(miniObj);
        //     }
            
        //     // Not Found, generating new entry
        //     else {
                
        //         var newLink = { original: inputURL, mini: generateCode() };
    
        //         linksDB.insert(newLink, function(err, doc) {
                
        //              if (err) throw err;
                    
        //              console.log('Added new entry:\n' + newLink);
        //              miniObj = newLink;
        //         });
        //     }
        // });
            
        db.close();
        res.json(miniObj);
    });

});

app.listen(8080, function() {
    console.log('Listening on port 8080');
})