const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const {userSignUpSchema, userSignInSchema} = require('../validations/userValidation');
const {validate} = require('../middleware/validation');

router.post('/signup', validate(userSignUpSchema), authController.signUpUser);
router.post('/signin', validate(userSignInSchema), authController.signInUser);
router.post('/logout', authController.logOut);

module.exports = router;