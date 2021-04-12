
var express = require('express');
var router = express.Router();
const user_verifier = require('../auth/user-verif.js');
const eventController = require('../controllers/event-controller');


router.get('/all', [user_verifier.requireSession, eventController.getUserEvents])
module.exports = router;