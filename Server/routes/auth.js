const router = require('express').Router();
const passport = require('../config/passport');
const restricted = require('../config/restricted');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication via Google OAuth2.0.
 */

/**
 * @swagger
 * paths:
 *   /auth/google:
 *     get:
 *       tags: [Auth]
 *       summary: Google authentication service
 *       description: Login and signup service via google OAuth2.0.
 */
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
    }).status(200);
});

/**
 * @swagger
 * paths:
 *   /auth/failed:
 *     get:
 *       summary: Failed redirect
 *       tags: [Auth]
 *       description: "Authentication failed redirect"
 *       responses:
 *         "401":
 *           description: Google auth failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 401
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
 *           
 */
router.get('/failed', (req, res) => {
    res.json({
        status: 401,
        error: 'OAuth Failed. PLease Try again',
        message: ""
    }).status(401);
})

/**
 * @swagger
 * paths:
 *   /auth/checksuccess:
 *     get:
 *       summary: Authentication Successfull
 *       tags: [Auth]
 *       description: "Authentication Successfull"
 *       responses:
 *         "200":
 *           description: User Logged in
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 200
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *         "401":
 *           description: User not authenticated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 401
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
           
 */
router.get('/checksuccess', restricted, (req, res) => {
    res.json({
        status: 200,
        error: 'none',
        message : 'LoginCheck',
        user : req.user,
    }).status(200);
});

/**
 * @swagger
 * paths:
 *   /auth/logout:
 *     get:
 *       summary: Logout current User
 *       tags: [Auth]
 *       description: "Logout current User"
 *       responses:
 *         "200":
 *           description: User logged out
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 200
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
 *         "401":
 *           description: User not authenticated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 401
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
           
 */
router.get('/logout', restricted, (req, res) => {
    req.logout();
    res.json({
        status: 200,
        error: 'none',
        message: 'logged out successfully',
    }).status(200);
})

module.exports = router;