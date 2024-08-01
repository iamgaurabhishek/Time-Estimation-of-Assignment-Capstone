const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registe
router.post('/register', async(req, res)=>{
    const { userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({ userName, email, hashedPassword });

    try{
        await user.save();
        res.status(201).send("User registered successfully");
    }
    catch(error){
        res.status(400).send(error);
    }
});

// Login
router.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id}, 'secretkey');
    res.status(200).json( { token});
});

module.exports = router;