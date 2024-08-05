const Assignment = require('../models/Assignment');

exports.submitAnswers = async (req, res)=> {
    const { userId, answers, estimatedTime } = req.body;

    try{
        const assignment = new Assignment({
            user: userId,
            answers,
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
        res.json(assignments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};