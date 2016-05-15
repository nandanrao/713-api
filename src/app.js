require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var tokenMiddleware = require('./token');
var firebase = require('./firebase');

var mood = require('./mood');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(tokenMiddleware());

app.post('/mood', (req, res, next) => {
  mood.handler(req.body, req.user.id)
    .then(ans => {
      res.status(201).json({ foo: 'bar' });
    })
})

app.get('/partyinfo', (req, res, next) => {
  firebase.child('time').once('value', snap => {
    var time = snap.val();
    var info = {
      startTime: time,
      location: 'Kongens Have'
    };
    res.json(info);
    next();
  });
});

app.get('/makemealist', (req, res, next) => {
  mood.addPublicList(req.user, req.token)
  res.sendStatus(200)
})

app.use((err, req, res, next) => {
  console.log('err', err.statusCode || err)
  res.status(err.statusCode || err).send();
})

app.listen(process.env.PORT || 9000)


module.exports = app;
