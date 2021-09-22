const express = require('express');
const router = express.Router();
const model = require('./../models/usersModel');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const fs =  require('fs');
const localStorage = require("local-storage");

const privateKey = fs.readFileSync('./keys/private.pem');
const jwtOptions = {
  algorithm: 'RS256', 
  expiresIn:'5h'
};

const all = (req, res) => {
  model
  .getAll()
  .then((response) => {res.status(200).json(response)})
  .catch((err) => res.status(500).json(err));
};

const single = (req, res) => {
  model
  .getSingle(req.params.id)
  .then((response) => {res.status(200).json(response)})
  .catch((err) => res.status(500).json(err));
}

const create = (req, res) => {
  const user = req.body; 
  const finalUser = { 
        username : user.username,
        pass : sha1(user.pass),
        mail : user.mail,
        telefono : user.telefono,
        direccion : user.direccion,
    };
  model
    .create(finalUser)
    .then((response) => {res.status(200).json(response)})
    .catch((err) => res.status(500).json(err));
};

/*
const login = (req, res) => {
  const { username, pass } = req.body;
  const finalUser = { 
    pass : sha1(pass)
  }
  model
  .validacion(username, finalUser.pass)
  .then((response) => {res.status(200).json(response)})
  .catch((err) => res.status(500).json(err));
};
*/

const login = async (req, res) => {
  try {
    let {username, pass} = req.body;
    const [user] = await model.login(username, sha1(pass));
    console.log(user);
    !user ? res.status(401) : null; //if user no existe -> 401 else -> null, es decir no hagas nada
    const payload = {id: user.id};
    const token = jwt.sign(payload, privateKey, jwtOptions);
    localStorage("jwt", token);
    localStorage("user", user);
    res.status(200).json({JWT: token, data: {user}})
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const update = (req, res) => {
  model
  .update(req.params.id, req.body)
  .then((response) => {res.status(200).json(response)})
  .catch((err) => res.status(500).json(err));
};

const del = (req, res) => {
  model
  .del(req.params.id)
  .then((response) => {res.status(200).json(response)})
  .catch((err) => res.status(500).json(err));
}

router.get('/', all);
router.get('/single/:id', single)
router.post('/login', login);
router.post('/registro', create);
router.put('/update/:id', update);
router.put('/del/:id', del);

module.exports = router;
