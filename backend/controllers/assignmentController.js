const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');

exports.submitAnswers = async (req, res)=> {
    const { userId, answers, estimatedTime } = req.body;

    try{
        const assignment = new Assignment({
            user: userId,
            answers: Object.fromEntries(answers.entries()), // Convert Map to plain object
            estimatedTime,
        });

        await assignment.save();

        res.json({msg: "Assignment submitted", assignment});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getAssignments = async (req, res) =>{
    try{
        const assignments =  await Assignment.find({ user: req.params.userId });
        if(assignments.length === 0){
            return res.status(404).json({ msg: "No assignments found for this user."})
        }
        res.json(assignments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};