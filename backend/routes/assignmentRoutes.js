const express = require('express');
const { submitAnswers, getAssignments } = require('../controllers/assignmentController');
const router = express.Router();

// POST /api/assignments/submit
router.post('/submit', submitAnswers);
router.get('/:userId', getAssignments);

module.exports = router;