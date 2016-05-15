// app.js
var express = require('express');
var bodyParser = require('body-parser');
var tokenMiddleware = require('./token');

var mood = require('./mood');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(tokenMiddleware());

app.post('/mood', (req, res, next) => {
  console.log(req.user) // songId
  mood.handler(req.body, req.user.id)
    .then(ans => {
      res.status(200).send(ans);
    })
  // next
})

app.get('partyinfo', (req, res, next) => {
  var info = {
    startTime: 1463263723300,
    location: 'Cool Park'
  }
  res.json(info);
})

app.use((err, req, res, next) => {
  console.log('err', err.statusCode || err)
  res.status(err.statusCode || err).send();
})

app.listen(process.env.PORT || 9000)


module.exports = app;
