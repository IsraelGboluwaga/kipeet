const Auth = require('../controller/AuthController');
const Dashboard = require('../config/constants').dashboard;


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
    getUserHome
};
