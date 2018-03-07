const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const ResponseMessages = require('../config/constants').responseMessages;


const userSchema =
    new Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: Number, required: true},
        task: {type: Schema.Types.ObjectId, ref: 'Task'},
        created_at: {type: Date, default: Date.now()}
    });


//authenticate input against database
userSchema.statics.authenticate = (email, password, next) => {
    User.findOne({email})
        .exec(function (err, user) {
            if (err) {
                return next(err)
            } else if (!user) {
                err = new Error();
                err.status = 401;
                err.message = ResponseMessages.NOT_USER;
                return next(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return next(null, user);
                } else {
                    err = new Error();
                    err.status = 400;
                    err.message = 'Incorrect password. Please try again';
                    return next(err);
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

let User = mongoose.model('User', userSchema);
module.exports = User;
