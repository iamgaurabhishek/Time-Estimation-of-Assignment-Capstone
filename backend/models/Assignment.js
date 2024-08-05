const mongoDB = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    answers: {
        type: Map,
        of: String,
        required: true,
    },
    estimatedTime: {
        days: { type: Number, required: true },
        hours: { type: Number, required: true }, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);