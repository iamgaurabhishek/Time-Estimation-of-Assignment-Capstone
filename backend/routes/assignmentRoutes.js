const express = require('express');
const { submitAnswers, getAssignments } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/submit', submitAnswers);
router.get('/:userId', getAssignments);

module.exports = router;