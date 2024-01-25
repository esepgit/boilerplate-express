let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

//middleware
app.use(function(req, res, next) {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
  next();
});

//ruta del css
app.use('/public', express.static(__dirname + '/public'));

console.log("Hello World");

//middleware body-parse
app.use(bodyParser.urlencoded({extended: false}));

//servidor de archivos html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//res json en base a variable de entorno
app.get('/json', function(req, res) {
  const note = process.env.MESSAGE_STYLE == "uppercase" ?
    {message: "HELLO JSON"} :
    {message: "Hello json"}

  res.json(note);
});

//manejadores encadenados
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time})
});

//leer parametros de cliente metodo 1
app.get('/:word/echo', function(req, res) {
  const word = req.params.word;
  res.json({echo: word});
});

//leer parametros de cliente metodo 2
app.route('/name')
  .get(function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;

    res.json({ name: `${firstName} ${lastName}` });
  }) //manejador del formulario utilizando body-parser para leer datos post
  .post(function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;

    res.json({name: `${firstName} ${lastName}`})
  })








module.exports = app;
