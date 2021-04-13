const router = require('express').Router();
const passport = require('../config/passport');
const restricted = require('../config/restricted');

router.get('/google', passport.authenticate(
    'google',
    {
        scope: ['openid', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
));

router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/auth/failed',
    }), 
    (req, res) => {
    res.json({
        status: 200,
        error : 'none',
        message : 'OAuth Successfull',
        user : req.user
    })
});

router.get('/failed', (req, res) => {
    res.json({
        status: 401,
        error: 'OAuth Failed. PLease Try again',
        message: ""
    })
})

router.get('/checksuccess', restricted, (req, res) => {
    res.json({
        status: 200,
        error: 'none',
        message : 'LoginCheck',
        user : req.user,
    })
});

router.get('/logout', restricted, (req, res) => {
    req.logout();
    res.json({
        status: 200,
        error: 'none',
        message: 'logged out successfully',
    })
})

module.exports = router;