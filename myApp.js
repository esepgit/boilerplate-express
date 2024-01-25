let express = require('express');
let app = express();
require('dotenv').config();

app.use(function(req, res, next) {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

console.log("Hello World");

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  const note = process.env.MESSAGE_STYLE == "uppercase" ?
    {message: "HELLO JSON"} :
    {message: "Hello json"}

  res.json(note);
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time})
});

app.get('/:word/echo', function(req, res) {
  const word = req.params.word;
  res.json({echo: word});
});






module.exports = app;
