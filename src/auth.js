var request = require('request-promise');
var _ = require('lodash');
var Promise = require('bluebird');

var clientId = process.env['SPOTIFY_ID'];
var clientSecret = process.env['SPOTIFY_SECRET'];

var authString = new Buffer(clientId + ':' + clientSecret).toString('base64');

function getToken () {
  return request({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + authString
    },
    form: {
      grant_type: 'client_credentials'
    }})
    .then(res => JSON.parse(res).access_token)
}

var callSpotify = function (url, token) {
  if (_.isString(url)) {
    url = { url: url };
  }
  return request(_.merge({
    headers: {
      Authorization: 'Bearer ' + token
    },
    json: true
  }, url))
}

module.exports = {
  callSpotify: callSpotify,
  getToken: getToken
}
