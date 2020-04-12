const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 5000;
const ip = '127.0.0.1';

//본문이 텍스트일 때
// app.use(bodyParser.raw());
// app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  next();
});

https: app.post('/upper', (req, res) => {
  res.status(200);
  res.json(req.body.value.toUpperCase());
});
app.post('/lower', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body.value.toLowerCase());
});

app.use(function (req, res) {
  res.status(404).send('404 ERROR');
});

app.listen(port, () => {
  console.log('server is running');
});
