const express = require('express');
const User = require('../models/User');
const admin = require('..');

const router = express.Router();

const verfitFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer')[1];

    if(!token){
        return res.status(403).send('Authorization token not found');
    }

    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.uid = decodedToken.uid;
        next();
    }
    catch(err){
        return res.status(401).send('Unauthorized');
    }
};

router.post('/userdata', verifyFirbaseToken, async (req, res, next) => {
    const { userName } = req.body;
    try{
        // let check the user exists in the database
        let user = await User.findOne( { uid: req.uid } );

        if(!user) {
            // if the user does not exist, create a new record
            user = new User( { uid: req.uid, userName} );
            await user.save();
        }
        else {
            // if user exists, you can update user data if needed
            user.userName = userName;
            await user.save();
        }

        res.status(200).send("User data saved successfully");
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;