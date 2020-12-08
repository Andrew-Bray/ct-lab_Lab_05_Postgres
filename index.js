require('dotenv').config();
const express = require('express');
const app = express();
const Kittycat = require('./lib/models/Kittycats.js');

const PORT = 1235;
app.use(express.json());


app.post('/kittycats', (req, res) => {
  Kittycat
    .insert(req.body)
    .then(kittycat => res.send(kittycat));
});

app.post('/kittycats', (req, res) => {
  Kittycat
    .find()
    .then(kittycat => res.send(kittycat));
});

app.listen(PORT, () => {
    console.log(`started on PORT ${PORT}`);
});

