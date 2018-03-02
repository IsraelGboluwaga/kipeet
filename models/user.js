const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const constants = require('../config/constants');


const userModel = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: Number, unique: true, required: true},
    task: {type: Schema.Types.ObjectId, ref: 'Task'}
});

userModel.plugin(uniqueValidator, {message: constants.PATH_NOT_UNIQUE});

//authenticate input against database
userModel.statics.authenticate = (email, password, next) => {
    userModel.findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return next(err)
            } else if (!user) {
                // console.log('Here');
                let err = new Error('User not found.');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return next(null, user);
                } else {
                    return next();
                }
            })
        });
};


userModel.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err)
            return err;

        user.password = hash;
        next();
    })
});


module.exports = mongoose.model('User', userModel);