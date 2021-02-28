var express = require('express');
var router = express.Router();

const creativeController = require('../controllers/creative-controller');

router.get('/all', creativeController.getCreatives);

/* 
    adds creative to the user's list 
    NOTE: currently assuming creative is valid when making request to add to the users list!!!!
*/
router.post('/', creativeController.addCreative);

router.delete('/:name', creativeController.removeCreative);

module.exports =  router;


