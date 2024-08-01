const express = require('express');
const Question = require('../models/Question');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const router = express.Router();

// Get questions
router.get('/', async(req, res)=>{
    const questions = await Question.find();
    res.status(200).json(questions);
});

// Submit responses
router.post('/submit', async(req, res)=>{
    const { token, responses } = req.body;
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    user.responses = responses;
    await user.save();

    // Estimate time logic here
    let estimatedDays = 0;
    let estimatedHours = 0;

    // Your logic to calculate estimatedDays and estimatedHours

    res.status(200).json({ estimatedDays, estimatedHours });
});

module.exports = router;