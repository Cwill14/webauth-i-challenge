const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    // const hash = bcrypt.hashSync(user.password);
    // console.log(hash);
    // user.password = hash;
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

router.get('/users', (req, res) => {
    Users.getUsers()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;