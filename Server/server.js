const express = require('express');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv').config();
const session = require('express-session');

if (dotenv.error){
    console.log(`Failed to fetch environment varibales`);
    throw dotenv.error;
}

const app = express();
const port = process.env.PORT || 8080;

//Connect db
const dbHanlde = require('./config/db');

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'mersenne',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({
        status: 200,
        error : 'none',
        message : 'Server ready to serve'
    }).status(200);
})

//Routes
app.use('/v1', require('./routes/v1'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server Responding at port ${port}`);
})