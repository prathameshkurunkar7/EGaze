const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventsController');
const {validationEvent} = require('../middlewares/validations');

router.get('/',eventController.getEvent);

router.post('/create',validationEvent,eventController.createEvent);

router.patch('/update/:eventId',validationEvent,eventController.updateEvent);

router.delete('/delete/:eventId',eventController.deleteEvent);

module.exports = router;