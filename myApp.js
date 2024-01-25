let express = require('express');
let app = express();
require('dotenv').config();

app.use('/', function(req, res, next) {
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
    {"message": "HELLO JSON"} :
    {"message": "Hello json"}

  res.json(note);
})






module.exports = app;
