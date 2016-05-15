// token middleware to stamp user onto Spotify token
var request = require('request-promise');

function getBearerToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

function createSpotifyMiddleware () {
  return function spotifyMiddleware (req, res, next) {
    var token = getBearerToken(req);
    request({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: 'Bearer ' + token
      },
      json: true
    })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next)
  }
}

module.exports = createSpotifyMiddleware;
