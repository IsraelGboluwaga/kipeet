const express = require('express');
const router = express.Router();

// GET /logout
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err)
                return next(err);

            return res.render('/');

        });
    } else {
        return res.redirect('/');
    }
});

module.exports = router;