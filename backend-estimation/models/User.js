const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;

//1. What is .pre? The .pre method is a Mongoose middleware function that allows you to run a function before a certain Mongoose event occurs. In this case, .pre('save', ...) means that the provided function will run before a document is saved to the database. This is useful for performing operations such as validation, modification, or logging before the document is persisted.

//2. What is isModified doing?
// The isModified method is a Mongoose document method that checks if a specific field has been modified. In this code, this.isModified('password') checks if the password field has been changed since the document was last saved. If the password has not been modified, the function calls next() and exits, skipping the password hashing step. This prevents unnecessary re-hashing of the password if it hasn't been changed.

//3. Why are we passing 10 in bcrypt.genSalt(10)?

// The number 10 passed to bcrypt.genSalt(10) is the cost factor, also known as the salt rounds. It defines the complexity of the salt generation process. A higher number means more computational work is required to generate the salt, which makes the password hashing process more secure but also slower. A value of 10 is a commonly used default that provides a good balance between security and performance.