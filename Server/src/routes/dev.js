var express = require('express');
var router = express.Router();

var Dev = require('../devModel')
/* Display values of all tables  */

router.get('/display', function(req, res, next) {
  Dev.display()
  res.send()
});

router.get('/clear', function(req, res, next) {
    Dev.clear().then(data => {
      res.json('Done');
    }).catch( error => {
      res.send(`error: ${error}`);
    })
  });

  router.get('/populate', function(req, res, next) {
    Dev.display()
    res.send()
  });

module.exports = router