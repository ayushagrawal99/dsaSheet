const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const {token} = cookies;

        const secrectKey = process.env.JWT_SECRET || '#dsaSheet@123';

        if(!token){
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decodedToken = jwt.verify(token, secrectKey);
        const {_id} = decodedToken;

        if(!_id){
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }

        let user = await User.findById({_id});
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        
        // attached login user
        req.user = user;

        next();
    } catch (error) {
        console.error('user-auth error:', error);
        next(error)
    }
}

module.exports = {
    userAuth
}