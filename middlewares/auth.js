const fs = require('fs');
const publicKey = fs.readFileSync('./keys/public.pem');
const jwt = require('jsonwebtoken');
const localStorage = require("local-storage");

const logged = (req, res, next) => {
    try {
        const authorization = localStorage("jwt");
        console.log(authorization);
        const res = jwt.verify(authorization, publicKey);
        next();
    }
    catch (err) {
        console.error(err);
        res.sendStatus(401);
    }
}

module.exports = { logged };