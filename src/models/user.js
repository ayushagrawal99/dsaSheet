const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        require: true,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type : String,
        maxLength: 20,
        trim: true
    },
    emailId: {
        type : String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw Error("Email ID format is Wrong "+ value)
            }
        }
    },
    password: {
        type : String,
        require: true,
        trim: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw Error("Password is not strong "+ value)
            }
        }
    },
    age: {
        type : Number,
    },
    gender: {
        type : String,
        enum : {
            values: ["male", "female", "others"],
            message: `{VALUE} gender is not allowed`,
        },
    },
    progress: [
        {
          topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
          completed: { type: Boolean, default: false }
        }
      ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;