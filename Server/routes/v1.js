const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 200,
        errors : 'none',
        message : '',
        user: req.user,
    });
    console.log(req.user);
});

module.exports =router;