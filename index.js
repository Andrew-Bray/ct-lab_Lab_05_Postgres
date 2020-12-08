require('dotenv').config();
const express = require('express');
const app = express();
const Kittycat = require('./lib/models/Kittycats.js');

const PORT = 1234;
app.use(express.json());


app.post('/kittycats', (req, res) => {
  Kittycat
    .insert(req.body)
    .then(kittycat => res.send(kittycat));
});

app.get('/kittycats', (req, res) => {
  Kittycat
    .find()
    .then(kittycats => res.send(kittycats));
});

app.get('/kittycats/:id', (req, res) => {
  Kittycat
    .findById(req.params.id)
    .then(kittycats => res.send(kittycats));
});

app.put('/kittycats/:id', (req, res) => {
  Kittycat
    .update(req.params.id, req.body)
    .then(kittycats => res.send(kittycats));
});

app.delete('/kittycats/:id', (req, res) => {
  Kittycat
    .delete(req.params.id)
    .then(kittycats => res.send(kittycats));
});


app.listen(PORT, () => {
    console.log(`started on PORT ${PORT}`);
});

module.exports = app;
