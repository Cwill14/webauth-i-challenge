const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const generateToken = require('../auth/generateToken-middleware.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password);

    if(user.username && user.password) {
        Users.addUser(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json(error)
        })
    } else {
        res.status(400).json({ error: "please provide username & password" })
    }    
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findUser({ username })
    .first()
    .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'You shall not pass!' });
        } else {
            req.session.username = user.username;
            req.session.loggedIn = true;
            req.session.cookie.userId = user.id;
            const token = generateToken(user);
            res.status(200).json({ 
                message: `Welcome, ${user.username}! have a token...`, 
                cookie: req.session.cookie,
                token
            })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: 'farewell' })
    })
})

router.get('/restricted/users', restricted, (req, res) => {
    Users.getUsers()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;