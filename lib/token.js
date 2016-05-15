'use strict';

// token middleware to stamp user onto Spotify token
var request = require('request-promise');
var firebase = require('./firebase');

function getBearerToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

function createSpotifyMiddleware() {
  return function spotifyMiddleware(req, res, next) {
    var token = getBearerToken(req);
    console.log('token', token);
    request({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: 'Bearer ' + token
      },
      json: true
    }).then(function (user) {
      req.user = user;
      req.token = token;
      var data = {};
      data[user.id] = token;
      firebase.child('tokens').update(data);
      next();
    }).catch(next);
  };
}

module.exports = createSpotifyMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFJLFVBQVUsUUFBUSxpQkFBUixDQUFkO0FBQ0EsSUFBSSxXQUFXLFFBQVEsWUFBUixDQUFmOztBQUVBLFNBQVMsY0FBVCxDQUF5QixHQUF6QixFQUE4QjtBQUM1QixNQUFJLElBQUksT0FBSixDQUFZLGFBQVosSUFBNkIsSUFBSSxPQUFKLENBQVksYUFBWixDQUEwQixLQUExQixDQUFnQyxHQUFoQyxFQUFxQyxDQUFyQyxNQUE0QyxRQUE3RSxFQUF1RjtBQUNyRixXQUFPLElBQUksT0FBSixDQUFZLGFBQVosQ0FBMEIsS0FBMUIsQ0FBZ0MsR0FBaEMsRUFBcUMsQ0FBckMsQ0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBUyx1QkFBVCxHQUFvQztBQUNsQyxTQUFPLFNBQVMsaUJBQVQsQ0FBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0MsSUFBdEMsRUFBNEM7QUFDakQsUUFBSSxRQUFRLGVBQWUsR0FBZixDQUFaO0FBQ0EsWUFBUSxHQUFSLENBQVksT0FBWixFQUFxQixLQUFyQjtBQUNBLFlBQVE7QUFDTixXQUFLLCtCQURDO0FBRU4sZUFBUztBQUNQLHVCQUFlLFlBQVk7QUFEcEIsT0FGSDtBQUtOLFlBQU07QUFMQSxLQUFSLEVBT0csSUFQSCxDQU9RLGdCQUFRO0FBQ1osVUFBSSxJQUFKLEdBQVcsSUFBWDtBQUNBLFVBQUksS0FBSixHQUFZLEtBQVo7QUFDQSxVQUFJLE9BQU8sRUFBWDtBQUNBLFdBQUssS0FBSyxFQUFWLElBQWdCLEtBQWhCO0FBQ0EsZUFBUyxLQUFULENBQWUsUUFBZixFQUF5QixNQUF6QixDQUFnQyxJQUFoQztBQUNBO0FBQ0QsS0FkSCxFQWVHLEtBZkgsQ0FlUyxJQWZUO0FBZ0JELEdBbkJEO0FBb0JEOztBQUVELE9BQU8sT0FBUCxHQUFpQix1QkFBakIiLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2tlbiBtaWRkbGV3YXJlIHRvIHN0YW1wIHVzZXIgb250byBTcG90aWZ5IHRva2VuXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3JlcXVlc3QtcHJvbWlzZScpO1xudmFyIGZpcmViYXNlID0gcmVxdWlyZSgnLi9maXJlYmFzZScpO1xuXG5mdW5jdGlvbiBnZXRCZWFyZXJUb2tlbiAocmVxKSB7XG4gIGlmIChyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24uc3BsaXQoJyAnKVswXSA9PT0gJ0JlYXJlcicpIHtcbiAgICByZXR1cm4gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdCgnICcpWzFdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTcG90aWZ5TWlkZGxld2FyZSAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzcG90aWZ5TWlkZGxld2FyZSAocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgdG9rZW4gPSBnZXRCZWFyZXJUb2tlbihyZXEpO1xuICAgIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuKVxuICAgIHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgfSxcbiAgICAgIGpzb246IHRydWVcbiAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcbiAgICAgICAgcmVxLnRva2VuID0gdG9rZW47XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGFbdXNlci5pZF0gPSB0b2tlblxuICAgICAgICBmaXJlYmFzZS5jaGlsZCgndG9rZW5zJykudXBkYXRlKGRhdGEpO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKG5leHQpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTcG90aWZ5TWlkZGxld2FyZTtcbiJdfQ==