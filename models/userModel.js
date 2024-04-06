const joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    age: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    gender: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    }
});

const User = mongoose.model('User', userSchema)

//Validation

function validateData(user){
    const schema = {
        name: joi.string().min(4).max(30).required(),
        age: joi.string().required(),
        phone: joi.string().min(10).max(30).required(),
        gender: joi.string().required(),
        mailId: joi.string().min(5).max(30).required(),
    }

    return joi.validate(user, schema)
};

exports.User = User
exports.validator = validateData