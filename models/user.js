const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const constants = require('../config/constants').constants;


let userSchema =
    new Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: Number, required: true},
        task: {type: Schema.Types.ObjectId, ref: 'Task'},
        created_at: {type: Date, default: Date.now()}
    });


// userSchema.plugin(uniqueValidator, {message: constants.PATH_NOT_UNIQUE});

//authenticate input against database
userSchema.statics.authenticate = (email, password, next) => {
    userSchema.findOne({email: email})
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


userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err)
            return err;

        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);
