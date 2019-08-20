const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./users/users-router.js');
const knexConnection = require('./data/db-config.js');

const server = express();

const sessionOptions = {
    name: 'seshOps?', // purpose?
    secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe', // kind of like the key?
    cookie: {
        secure: process.env.COOKIE_SECURE || false, // ?
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    },
    resave: false, // ?
    saveUninitialized: true, // ?
    store: new KnexSessionStore({
        knex: knexConnection, //?
        createtable: true,
        clearInterval: 1000 * 60 * 60 * 12
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "it's working!", session: req.session });
})

module.exports = server;