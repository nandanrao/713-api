// mood
const mood = {};
var firebase = require('./firebase');

var Promise = require('bluebird');

mood.handler = function moodHandler (song, userId) {
  return new Promise((resolve, reject) => {
    var data = {};
    data[userId] = song.songId;
    firebase.child('moodsongs').update(data, err => {
      if (err) reject(err);
      resolve('hooo');
    })
  })
}

firebase.child('moodsongs').on('value', snap => {
  console.log('moodsongs', snap.val())
  // ref.child('playlist')
  // hit python api
  // update firebase songs list
})


mood.onListChange = function onListChange (songs) {
  // mood list
}

module.exports = mood;
