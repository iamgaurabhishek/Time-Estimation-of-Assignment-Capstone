const express = require('express');
const Question = require('../models/Question');
const User = require('../models/User');
// fill the admin
const admin = require("..");

const router = express.Router();

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async(req, res, next) =>{
    const token = req.headers.authorization?.split('Bearer ')[1];

    if(!token){
        return res.status(403).send('Authorization token not found');
    }
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.uid = decodedToken.uid;
        next();
    }
    catch(err){
        return res.status(401).send('Unauthorized');
    }
};

// Get questions
router.get('/', async(req, res) =>{
    try{
        const questions = await Question.find();
        res.status(200).json(questions);
    }catch(err){
        res.status(500).send('Server error');
    }
});

// Submit responses
router.post('/submit', verifyFirebaseToken, async(req, res) =>{
    const { responses } = req.body;

    try{
        // Find the user by Firebase UID
        let user = await User.findOne({ uid: req.uid});
        if(!user){
            user = new User({ uid: req.uid, responses: [] });
        }

        // Save the responses
        user.responses.push(responses);
        await user.save();

        // Estimate time logic
        const { estimatedDays, estimatedHours } = estimateTime(responses);

        res.status(200).json({ estimatedDays, estimatedHours });
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;

// Time Estimation Formula

function estimateTime(responses) {
    let estimatedDays = 0;
    let estimatedHours = 0;

    // 1. Reading the Assignment Completely
    if(responses[0] === "Yes"){
        estimatedHours -= 0.75; // Deduct 0.75 if the assignment is read completely
    }
    else{
        estimatedHours += 2; // Add 4 hours if not read
    }

    // 2. Completed Similar Assignments
    if(responses[1] === "Yes"){
        estimatedDays -= 1; // Reduce a day if similar assignment was completed
    }else{
        estimatedDays += 2; // Add 2 days for no prior experience
    }

    // 3. Specific Skills and Confidence levels
    const skillConfidenceMap = {
        "Writing": 2,
        "Data Analysis": 3,
        "Coding": 4,
        "Research": 2,
        "Project Management": 3,
        "Communication": 2,
        "Graphic Design": 3,
        "Others": 2
    };
    let skillScore = 0;
    responses[2].forEach( skill => {
        skillScore += skillConfidenceMap[skill];
    });

    //Adjust time based on the skillScore
    estimatedHours += skillScore * 2;

    // 4. Perceived Challenge
    if(responses[3] === "Yes"){
        estimatedDays += 1; // Add a day if user feels challenged
    }

    // 5. Strategy for Handling Delays
    const proactiveStrategies =["Communicate with your professor why is it delayed?","Will take some help from your classmates/ professors?", "Create a timeline for yourself and keep track of each day doings to decrease pressure during.","Don't have a strategy just start doing it.","Acknowledging delay formally first?", "Leave margin for unexpected delays."];

    proactiveStrategies.forEach(strategy => {
        if(responses[4].includes(strategy)){
            estimatedHours -= 1; // Deduct an hour for each proactive strategy
        }
    });
    if(responses[4].includes("Don't have a strategy just start doing it.")){
        estimatedHours += 3; // Adding 3 hours for lack of strategy
        estimatedDays += 2; // Add 2 days for lack of strategy
    }

    if(responses[5] === "Long uninterrupted sessions"){
        estimatedHours -= 2; // Deduct 2 hours if the user prefers long sessions
    }
    else{
        estimatedHours += 3; // Add 3 hours if the user prefers short sessions
    }

    // Ensure that the estimated time doesn't go negative
    estimatedDays = Math.max(estimatedDays, 0);
    estimatedHours = Math.max(estimatedHours, 0);

    // Normalize estimatedHours to convert to days if more than 24 hours
    while (estimatedHours >= 24){
        estimatedHours -= 24;
        estimatedDays += 1;
    }

    return { estimatedDays, estimatedHours };
}