const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signUpUser = async (req,res,next) => {
    try {
        const {firstName, lastName, emailId, password, age, gender} = req.body;

        // Encrypt the password
        let hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: hashedPassword, age, gender
        });
        await user.save();

        return res.json({
            message : "User save successfully"
        })
    } catch (error) {
        console.error('Sign-up error:', error);
        next(error);
    }
}


exports.signInUser = async (req,res,next) => {
    const { emailId, password} = req.body;

    try {
        const secrectKey = process.env.JWT_SECRET || '#dsaSheet@123';

        let user = await User.findOne({emailId});
        if(!user){
            return res.status(400).json({ message: 'Email not found in database' });
        }

        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
     
        if(isValidPassword){

            // create JWT token
            let token = await jwt.sign({ _id: user.id }, secrectKey, {expiresIn : '1h'});

            res.cookie('token', token, {
                maxAge: 3600000,
            });

            return res.json({
                message: 'Login successful',
                token, 
            });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Sign-in error:', error);
        next(error)
    }
}

exports.logOut = async (req,res,next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now())
        })
        return res.status(200).json({ message: 'Logout Successfully' });
    } catch (error) {
        console.error('Log-out error:', error);
        next(error);
    }
}
