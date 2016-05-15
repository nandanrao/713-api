// mood
const mood = {};
var _ = require('lodash');
var firebase = require('./firebase');
var request = require('request-promise');
var Promise = require('bluebird');
var auth = require('./auth');
var recommender = require('./recommender');

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

mood.getSongInfo = function getSongInfo(songs) {
  return auth.getToken()
    .then(token => {
      return Promise.all(songs.map(song => {
        return Promise.all([
          auth.callSpotify('https://api.spotify.com/v1/audio-features/' + song, token),
          auth.callSpotify('https://api.spotify.com/v1/tracks/' + song, token)
        ])
          .then(arr => _.merge(arr[0], arr[1]))
          .then(combinedInfo => {
            var artistId = combinedInfo.artists[0].id
            console.log(artistId)
            return auth.callSpotify('https://api.spotify.com/v1/artists/' + artistId, token)
              .then(artist => _.merge(combinedInfo, { genres: artist.genres }))
          })
      }))
    })
}

mood.getPlaylist = function getPlaylist(moodsongs) {
  var clusters = process.env['CLUSTERS'] + '/clusters' || 'http://localhost:5000/clusters';

  return mood.getSongInfo(moodsongs)
    .then(songs => {
      return request({
        url: clusters,
        method: 'POST',
        body: {
          songs: songs
        },
        json: true
      })
    })
    .then(({features, artists}) => recommender.getSongs(features, artists))
}

firebase.child('moodsongs').on('value', snap => {
  var moodsongs = _.values(snap.val());
  console.log('moodsongs', moodsongs);
  mood.onListChange(moodsongs)
})

mood.trimPlaylist = function trimPlaylist (playlist) {
  return playlist.tracks.map(track => {
    var start = _.pick(track, ['id', 'name', 'artists', 'duration_ms']);
    start.artist = start.artists.map(artist => artist.name).join(', ');
    delete start.artists;
    return start;
  })
}

mood.onListChange = function onListChange (moodsongs) {
  mood.getPlaylist(moodsongs)
    .then(playlist => {
      var p = mood.trimPlaylist(playlist)
      firebase.child('playlist').set(p)
      firebase.child('pointer').set(p[0])
    })
}

module.exports = mood;
