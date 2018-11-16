var router = require('express').Router()
var Shorten = require('../model/shorten.js')

var validUrl = require('valid-url')

function generateCode () {
  return Math.floor(1000 + Math.random() * 10000)
}
// Check URLs
router.post('/new', (req, res, next) => {
  var inputURL = req.body.url

  if (!validUrl.isUri(inputURL)) {
    res.json({error: 'Invalid url format, see main page for correct format'})
  } else {
    // Checking if entry already exists
    Shorten.findOne({ original: inputURL }).select('original code -_id').exec()
      .then(entry => {
        if (entry) {
          // console.log(inputURL + ' | matching entry found: ' + JSON.stringify(entry))
          return entry
        } else {
          // console.log(inputURL + ' not Found')
          var num = generateCode()
          var newEntry = new Shorten({ original: inputURL, code: num })
          return newEntry.save()
        }
      })
      .then(entry => {
        res.json({ original: entry.original, code: entry.code })
      })
      .catch(err => {
        return next(err)
      })
  }
})

// Checking Code
router.get('/:num', (req, res, next) => {
  var num = req.params.num

  if (!(num.match(/^\d+$/))) {
    res.json({error: 'Invalid code format, see main page for correct format'})
  } else {
    // Checking if entry already exists
    Shorten.findOne({ code: num }).select('original code -_id').exec()
      .then(entry => {
        if (entry) {
          // console.log('Redirecting to ' + entry.original)
          res.redirect(entry.original)
        } else {
          res.json({error: 'Code not Found'})
        }
      })
      .catch(err => {
        return next(err)
      })
  }
})

module.exports = router
