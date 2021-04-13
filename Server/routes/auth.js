const router = require('express').Router();
const passport = require('../config/passport');

router.get('/google', passport.authenticate(
    'google',
    {
        scope: ['openid', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
));

router.get('/google/callback', passport.authenticate(
    'google',
    {
        failureRedirect: '/auth/failed',
    }
), (req, res) => {
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

module.exports = router;