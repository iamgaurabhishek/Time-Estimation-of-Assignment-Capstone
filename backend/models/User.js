const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: String,
    email: { type: String, unique: true},
    password: String,
    responses: Array
});

module.exports = mongoose.model('User', UserSchema);