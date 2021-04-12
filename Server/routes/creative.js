var express = require('express');
var router = express.Router();
const user_verifier = require('../auth/user-verif.js');
const creativeController = require('../controllers/creative-controller');
const eventController = require('../controllers/event-controller');

router.get('/all', [ user_verifier.requireSession, creativeController.getCreatives]);

/* 
    adds creative to the user's list 
    NOTE: currently assuming creative is valid when making request to add to the users list!!!!
*/
router.post('/', [ user_verifier.requireSession, creativeController.validArtist, creativeController.addCreative]);

router.delete('/:name', creativeController.removeCreative);

module.exports =  router;


