const router = require('express').Router();
const fetch = require('node-fetch');
const getMovieById = require('../../parser/getMovieById');
const getMovieRatingsById = require('../../parser/getMovieRatingsById');
const getPersonById = require('../../parser/getPersonById');
const restricted = require('../../config/restricted');
const { json } = require('express');

/**
 * @swagger
 * tags:
 *   name: Resource
 *   description: Textual Resource of Movies, Ratings, Person from IMDB dataset.
 */

/**
 * @swagger
 * paths:
 *   /resource/movie/{tconst}:
 *     get:
 *       summary: Get Array Object of Movie
 *       tags: [Resource]
 *       description: "Movie Details by Id"
 *       responses:
 *         "200":
 *           description: Movie Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: Array
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
 *         "404":
 *           description: Movie with given ID not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status: 
 *                     type: integer
 *                     example: 404
 *                   error:
 *                     type: string
 *                   message:
 *                     type: string
 *         "500":
 *           description: Internal Server Error
 */

router.get('/movie/:tconst', restricted, (req, res) => {
    let url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&i=${req.params.tconst}`;
    fetch(url).then(data => data.json()).then(result => {
        const message = {
            status: 200,
            error: '',
            message: '',
        };
        if(result.Respose != undefined && result.Response == 'False'){
            message.status = 404;
            message.error = result.Error;
            res.status(404);
        }
        else{
            message.movie = result;
            res.status(200);
        }

        res.json(message);
    })
    .catch(e => {
        console.log(e);
        res.status(500).json({
            error: 'server error',
        })
    });
})


module.exports = router;