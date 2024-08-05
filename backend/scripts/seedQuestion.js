// for seeding these questions insied the mongoDB please run this command : node scripts/seedQuestion.js

const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// replace the mongodb://localhost with the actual mongodb url.

const questions = [
    {
        "questions": "Did you read your Assignment completely?",
        "options": ["Yes", "No"]
    },
    {
        "questions": "Have you completed similar kind of or any assignment in the past? If so, how long does it took?",
        "options": ["Yes", "No"]
    },
    {
        "questions": "What specific skills are required for this assignment and how confident are you in those skills? (on a scale of 0 to 10)",
        "options": ["Writing", "Data Analysis", "Coding", "Research", "Project Management", "Communication", "Graphic Design", "Others"]
    },
    {
        "questions": "Do you fell this going to be challenging for you?",
        "options": ["Yes", "No"]
    },
    {
        "questions": "What is your strategy for handling unexpected delays or issues?",
        "options": ["Communicate with your professor why is it delayed?", "Will take some help from your classmates/ professors?", "Create a timeline for yourself and keep track of each day doings to decrease pressure during.", "Don't have a strategy just start doing it.", "Acknowledging delay formally first?", "Leave margin for unexpected delays."]
    },
    {
        "questions": "What is your style of working?",
        "options": ["Long uninterrupted sessions", "Short sessions with breaks"]
    }
];
Question.insertMany(questions)
    .then(()=>{
        console.log("Questions seeded");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
