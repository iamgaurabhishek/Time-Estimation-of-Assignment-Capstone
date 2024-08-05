const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firebaseUID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },

    // userName: String,
    // email: { type: String, unique: true},
    // password: String,
    // responses: Array
});

module.exports = mongoose.model('User', UserSchema);