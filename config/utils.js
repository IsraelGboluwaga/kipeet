let regex, regObj;
const User = require('../models/user');


const check = {
    username: function (username) {
        regex = '^[a-zA-Z0-9_]{1,15}$';
        regObj = new RegExp(regex);

        if (!regObj.test(username))
            return false;

        return username;
    },
    email: function (email) {
        regex = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
        regObj = new RegExp(regex);

        if (!regObj.test(email.trim()))
            return false;

        return email;
    },
    phone: function (phone) {
        regex = '^(([0-9]|\\+)(\\d{9})|(\\d{11}))$';
        //This only allows + at the beginning; it requires 3 digits, followed by an optional dash, followed by 6-12 more digits
        regObj = new RegExp(regex);

        if (!regObj.test(phone))
            return false;

        return phone;
    }
};

let usernameExists = (user) => {
    return User.findOne(
        {username: user.username}
    ).then(
        (err, username, next) => {
            if (err)
                return next(err);

            return !!username;
        }
    ).catch((error) => {
        throw error;
    });
};

let emailExists = (user) => {
    return User.findOne(
        {email: user.email}
    ).then(
        (err, email, next) => {
            if (err)
                return next(err);

            return !!email;
        }
    ).catch((error) => {
        throw error;
    });
};

let phoneExists = (user) => {
    return User.findOne(
        {phone: user.phone}
    ).then(
        (err, phone, next) => {
            if (err)
                return next(err);

            return !!phone;
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
        (err, user, next) => {
            if (err)
                return next(err);

            return !!user;
        }
    ).catch((error) => {
        throw error;
    });
};



module.exports =
    {
        check,
        emailExists,
        phoneExists,
        usernameExists,
        userExists
    };