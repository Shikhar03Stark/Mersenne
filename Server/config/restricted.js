//passport middleware for restricted access to realm
const passport = require('./passport');

const restricted = (req, res, next) => {
    if(req.user == undefined){
        res.json({
            status: 401,
            error : 'Unauthorized',
            message : 'Sign up or login'
        }).end()
    }
    else{
        next();
    }
}

module.exports = restricted;