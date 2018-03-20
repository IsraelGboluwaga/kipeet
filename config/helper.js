const User = require('../models/user');

const getUser = (req, res, next, user_id) => {
    return User.find({_id: user_id},
        (err, user) => {
            if (err) {
                return next(err);
            }
            if (user) {
                return user;
            }
        }
    );
};


module.exports = {getUser};