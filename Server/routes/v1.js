const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi : '3.0.0',
    info : {
        title : 'Mersenne REST API docs',
        version : '1.0.0',
        description : 'Mersenne REST API server v1',
        contact : {
            name : 'Mersenne',
            email : 'hv.harshit321@gmail.com',
        },
    },
    servers : [{
        url : process.env.ROOT,
        description : 'Master REST server',
    }]
};

const options = {
    swaggerDefinition,
    apis : ['./routes/auth.js', './routes/v1.js', './routes/v1/*.js'],
};

const swaggerSpecs = swaggerJSDoc(options);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpecs));

//sub routes
router.use('/resource', require('./v1/resource.js'));

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