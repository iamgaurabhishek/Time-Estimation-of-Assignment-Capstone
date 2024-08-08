const User = require('../models/User');
const admin = require('firebase-admin');

exports.registerUser = async (req, res)=>{
    const { email, firebaseUID, username } = req.body;
    try {
        let user = await User.findOne({ firebaseUID });

        if(!user){
            user = new User({
                firebaseUID,
                email,
                username,
            });
            await user.save();
        }

        res.json({msg:"User registered successfully", user});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};