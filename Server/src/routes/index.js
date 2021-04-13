var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Event Page');
});

/* GET Event Page. */
router.get('/events', function(req, res, next) {
  res.json('Event Page');
});

/* GET Creatives Page. */
router.get('/creatives', function(req, res, next) {
  res.json('Creatives Page');
});

/* GET Sign In Page. */
router.get('/signin', function(req, res, next) {
  res.json('Sign In Page');
});

/* GET Sign In Page. */
router.get('/registration', function(req, res, next) {
  res.json('Registration Page');
});

module.exports = router;
