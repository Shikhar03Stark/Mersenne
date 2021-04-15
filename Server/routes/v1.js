const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 200,
        errors : 'none',
        message : 'debug session val',
        user: req.user,
    }).status(200);
    console.log(req.user);
});

module.exports =router;