const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventsController');
const {verifyToken} = require('../middleware/middleware');
const router = express.Router();


router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);


module.exports = router;