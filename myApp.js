let express = require('express');
let app = express();
require('dotenv').config();
const note = {
  message: "Hello json",
};

app.use('/public', express.static(__dirname + '/public'));

console.log("Hello World");
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    note.message = note.message.toUpperCase();
  }

  res.json(note);
});


































 module.exports = app;
