'use strict';

var validUrl = require('valid-url');

module.exports = function(app, urlDB) {
    
    app.get('/testing/:num?', function(res, req) {
        res.send(req.params.num || 'testing')
    })
    
    function generateCode() {
        return Math.floor(1000 + Math.random() * 10000).toString();
    }
    
    function checkDB(query, filter, callback) {
        query.exec(function(err, entry) {
            if (err) return console.err(err);
            if (entry) {
                console.log(filter + ' | matching entry found: ' + JSON.stringify(entry));
            } else {
                console.log(filter + ' not Found');
            }
            callback(entry);
        });
    }
    
    function createEntry(url, callback) {
        var num = generateCode().toString();
        var newEntry = new urlDB({ original: url, code: num });
        
        newEntry.save(function(err, newEntry){
            if (err) return console.error(err);
            console.log('Added new entry: ' + JSON.stringify({ original: newEntry.original, mini: newEntry.code }));
        });
        callback({ original: newEntry.original, mini: newEntry.code }); // NOTE: Clean this up
    }
    

    // Check URLs
    app.get('/new/:url(*)', function(req, res){
        
        var inputURL = req.params.url;
        
        if (!validUrl.isUri(inputURL)){
            res.json({error: 'Invalid url format, see main page for correct format'});
        } else {
            
            // Checking if entry already exists
            console.log('Beginning search');
            var query = urlDB.findOne({original: inputURL}).select('original code -_id');
            checkDB(query, inputURL, function(message) {
                if (!message) {
                    createEntry(inputURL, function(newEntry){
                         message = newEntry;
                     });   
                }
                res.json(message);
            });
        }
    });
    
    // Checking Code
    app.get('/:num(*)', function(req, res){
        
        var num = req.params.num;
        
        if (!(num.match(/^\d+$/))){
            res.json({error: 'Invalid code format, see main page for correct format'});
        } else {
            
            // Checking if entry already exists
            var query = urlDB.findOne({code: num}).select('original code -_id');
            checkDB(query, num, function(message) {
                if (!message) {
                    res.json({error: 'Code not Found'});
                } else {
                    console.log('Redirecting to ' + message.original);
                    res.redirect(message.original);
                }
                
            });
        }
    });
    
};
