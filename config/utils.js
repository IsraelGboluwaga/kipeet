let regex, regObj;

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

module.exports = check;