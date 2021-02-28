const eventController = require('../controllers/event-controller');
var express = require('express');
var router = express.Router();

router.get('/events/:id', eventController.getEvent);
router.delete('/events/:id', eventController.deleteEvent);
router.put('/events', eventController.createEvent);

module.exports = router;