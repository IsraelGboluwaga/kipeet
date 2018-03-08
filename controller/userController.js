const Auth = require('./authController');


const getSignIn = (req, res, next) => {
    Auth.preventReloginOrSignup(req, res, next)
        .then((user) => {
            if (user) {
                return res.redirect(`/user/${user.username}`);
            }

            return next()
        })
        .catch((error) => {
            return error;
        })
};

const getUserHome = (req, res, next) => {
    Auth.validateLoggedInUser(req, res, next)
        .then(() => {
            if (req.session.userId) {
                return next();
            }
            return res.redirect('/login')
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = {
    getUserHome,
    getSignIn
};
