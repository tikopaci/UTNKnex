const express = require('express');
const router = express.Router();
const model = require('../models/productosModel');

const all = (req, res) => {
    model
    .getAll()
    .then((response) => {res.status(200).json(response)})
    .catch((err) => res.status(500).json(err));
};

const create = (req, res) => {
    const obj = req.body;
    model
    .create(obj)
    .then((response) => {res.status(200).json(response)})
    .catch((err) => res.status(500).json(err));
};

const single = (req, res) => {
    model
    .single(req.params.id)
    .then((response) => {res.status(200).json(response)})
    .catch((err) => res.status(500).json(err));
};

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
router.get('/single/:id', single);
router.post('/create', create);
router.post('/update/:id', update);
router.post('del/:id', del);

module.exports = router;