const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = function restricted(req, res, next) {
    console.log("in restricted: ", req.session);
    // if (req.session && req.session.loggedIn) {
    if (req.session.loggedIn) {
        console.log('yay');
        
        next();
    } else {
        res.status(401).json({ message: "You shall not pass!" });
    }
    
    // let { username, password } = req.headers;

    // if(username && password) {
    //     Users.findUser({ username })
    //         .first()
    //         .then(user => {
    //             if(!user && !bcrypt.compareSync(password, user.password)) {
    //                 res.status(401).json({ message: "You shall not pass!" });
    //             } else {
    //                 next();
    //             }
    //         })
    //         .catch(err => {
    //             res.status(500).json(err);
    //         })
    // } else {
    //     res.status(400).json({ error: "Please provide valid credentials" });
    // }
}