const constants = require('./constants');
let regex, exists;

let check = {
    username: function (user, username) {
        regex = '/^(?=.*[a-z])[a-z0-9]{4,20}$/gm';
        if (!username.match(regex)){
            throw constants.INVALID_USERNAME;
        }

        //Check if it's in db
        exists = user.findOne(
            {username: username},
            (err, doc) => {
                if (err)
                    throw err;

                if (doc)
                    return doc;
            });

        if (exists) {
            throw constants.USERNAME_ALREADY_EXISTS;
        }
        return username;

    },
    email: function (user, email) {
        regex = '/^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$/gm';
        if (!email.match(regex)) {
            throw constants.INVALID_EMAIL;
        }

        //Check db
        exists = user.findOne(
            {email: email},
            (err, doc) => {
                if (err)
                    throw err;

                if (doc)
                    return doc;
            });

        if (exists) {
            throw constants.EMAIL_ALREADY_EXISTS;
        }
        return email;
    },
    phone: function (user, phone) {
        regex = '/[2-9]{2}\\d{8}/gm'; //for 10-digit phone numbers
        if (!phone.match(regex)) {
            throw constants.INVALID_PHONE
        }

        //Check db
        exists = user.findOne(
            {phone: phone},
            (err, doc) => {
                if (err)
                    throw err;

                if (doc)
                    return doc;
            }
        );

        if (exists) {
            throw constants.PHONE_ALREADY_EXISTS;
        }
        return phone;
    }

};