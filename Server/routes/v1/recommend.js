const restricted = require('../../config/restricted');
const fetch = require('node-fetch');
const router = require('express').Router();

const generateIds = (num) => {
    let arr = [];
    for(let i = 0; i<num; i++){
        let num = `${Math.floor(Math.random()*Math.pow(10,7)) % parseInt(4*Math.pow(10,6))}`.padStart(7,'0');
        arr.push(`tt${num}`);
    }

    return arr;
}

const fetchMovie = async (tconst) => {
    try{
        let url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&i=${tconst}`;
        const data = await fetch(url);
        const result = await data.json();
        result.id = tconst;
        console.log(result);
        return await result;
    } catch (e) {
        throw e;
    }
}

/**
 * @swagger
 * tags:
 *   name: Recommend
 *   description: Perform Recommendation for User
 */

/**
 * @swagger
 * paths:
 *   /recommend/random/{limit}:
 *     get:
 *       summary: Development Purpose
 *       tags: [Recommend]
 *       description: "Array of Movie Objects"
 *       responses:
 *         "200":
 *           description: Array of limit number of Movies
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
 *         "500":
 *           description: Internal Server Error
 */
router.get('/random/:limit', restricted, (req, res) => {
    const limit = req.params.limit;
    const ids = generateIds(limit);
    const promises = ids.map(tconst => fetchMovie(tconst));
    Promise.all(promises).then(result => {
        const message = {
            status: 200,
            error: '',
            message: '',
            movies: result,
        }

        res.status(200).json(message);
    })
    .catch(e => {
        console.log(e);
        const message = {
            status: 500,
            error: 'server error',
            message: '',
        }

        res.status(500).json(message);
    })
})

module.exports = router;