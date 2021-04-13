const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(
    new GoogleStrategy({
        clientID: process.env.OA_CLIENT_ID,
        clientSecret: process.env.OA_CLIENT_SEC,
        callbackURL: `${process.env.ROOT}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

module.exports = passport;