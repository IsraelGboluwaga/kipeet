let User = require('../models/user');


let usernameExists = (user) => {
    return User.findOne(
        {username: user.username},
        (err, username) => {
            if (!username)
                return false;

            return true
        });
};

let emailExists = (user) => {
    return User.findOne(
        {email: user.email}
    ).then(
        (user) => {
            if (user)
                return true;

            return false;
        }
    ).catch((error) => {
        throw error;
    });
};

let phoneExists = (user) => {
    return User.findOne(
        {phone: user.phone}
    ).then(
        (user) => {
            if (user)
                return true;

            return false;
        }
    ).catch((error) => {
        throw error;
    });
};

let userExists = (user) => {
    return User.findOne(
        {
            username: user.username,
            email: user.email,
            phone: user.phone
        }
    ).then(
        (user) => {
            if (user)
                return true;

            return false;
        }
    ).catch((error) => {
        throw error;
    });
};

module.exports = {
    usernameExists,
    emailExists,
    phoneExists,
    userExists
};