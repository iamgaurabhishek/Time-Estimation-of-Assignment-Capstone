const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: Array
});

module.exports = mongoose.model('Question', QuestionSchema);