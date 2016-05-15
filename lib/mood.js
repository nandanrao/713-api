'use strict';

// mood
var mood = {};
var firebase = require('./firebase');

var Promise = require('bluebird');

mood.handler = function moodHandler(song, userId) {
  return new Promise(function (resolve, reject) {
    var data = {};
    data[userId] = song.songId;
    firebase.child('moodsongs').update(data, function (err) {
      if (err) reject(err);
      resolve('hooo');
    });
  });
};

firebase.child('moodsongs').on('value', function (snap) {
  console.log('moodsongs', snap.val());
  // ref.child('playlist')
  // hit python api
  // update firebase songs list
});

mood.onListChange = function onListChange(songs) {
  // mood list
};

module.exports = mood;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb29kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQU0sT0FBTyxFQUFiO0FBQ0EsSUFBSSxXQUFXLFFBQVEsWUFBUixDQUFmOztBQUVBLElBQUksVUFBVSxRQUFRLFVBQVIsQ0FBZDs7QUFFQSxLQUFLLE9BQUwsR0FBZSxTQUFTLFdBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsTUFBNUIsRUFBb0M7QUFDakQsU0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFFBQUksT0FBTyxFQUFYO0FBQ0EsU0FBSyxNQUFMLElBQWUsS0FBSyxNQUFwQjtBQUNBLGFBQVMsS0FBVCxDQUFlLFdBQWYsRUFBNEIsTUFBNUIsQ0FBbUMsSUFBbkMsRUFBeUMsZUFBTztBQUM5QyxVQUFJLEdBQUosRUFBUyxPQUFPLEdBQVA7QUFDVCxjQUFRLE1BQVI7QUFDRCxLQUhEO0FBSUQsR0FQTSxDQUFQO0FBUUQsQ0FURDs7QUFXQSxTQUFTLEtBQVQsQ0FBZSxXQUFmLEVBQTRCLEVBQTVCLENBQStCLE9BQS9CLEVBQXdDLGdCQUFRO0FBQzlDLFVBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBSyxHQUFMLEVBQXpCOzs7O0FBSUQsQ0FMRDs7QUFRQSxLQUFLLFlBQUwsR0FBb0IsU0FBUyxZQUFULENBQXVCLEtBQXZCLEVBQThCOztBQUVqRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJtb29kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbW9vZFxuY29uc3QgbW9vZCA9IHt9O1xudmFyIGZpcmViYXNlID0gcmVxdWlyZSgnLi9maXJlYmFzZScpO1xuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XG5cbm1vb2QuaGFuZGxlciA9IGZ1bmN0aW9uIG1vb2RIYW5kbGVyIChzb25nLCB1c2VySWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIGRhdGFbdXNlcklkXSA9IHNvbmcuc29uZ0lkO1xuICAgIGZpcmViYXNlLmNoaWxkKCdtb29kc29uZ3MnKS51cGRhdGUoZGF0YSwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgcmVzb2x2ZSgnaG9vbycpO1xuICAgIH0pXG4gIH0pXG59XG5cbmZpcmViYXNlLmNoaWxkKCdtb29kc29uZ3MnKS5vbigndmFsdWUnLCBzbmFwID0+IHtcbiAgY29uc29sZS5sb2coJ21vb2Rzb25ncycsIHNuYXAudmFsKCkpXG4gIC8vIHJlZi5jaGlsZCgncGxheWxpc3QnKVxuICAvLyBoaXQgcHl0aG9uIGFwaVxuICAvLyB1cGRhdGUgZmlyZWJhc2Ugc29uZ3MgbGlzdFxufSlcblxuXG5tb29kLm9uTGlzdENoYW5nZSA9IGZ1bmN0aW9uIG9uTGlzdENoYW5nZSAoc29uZ3MpIHtcbiAgLy8gbW9vZCBsaXN0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9vZDtcbiJdfQ==