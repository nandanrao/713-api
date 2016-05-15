// recommender
var _ = require('lodash');
var request = require('request-promise');
var auth = require('./auth');

const rec = {};

rec.getRange = function getRange (name, num) {
  var ans = {};
  ans['target_' + name] = num;
  // ans['min_' + name] = num*.7;
  // ans['max_' + name] = num*1.3;
  return ans;
};

rec.convert = function convert (conf) {
  var raw = Object.keys(conf)
    .map(key => rec.getRange(key, conf[key]))
    .reduce((a,b) => _.merge(a,b));
  // if (raw.max_popularity) {
  //   raw.max_popularity = Math.ceil(raw.max_popularity)
  //   raw.min_popularity = Math.ceil(raw.min_popularity)
  // }
  if (raw.target_popularity) {
    raw.target_popularity = Math.ceil(raw.target_popularity)
  }
  return raw;
};

rec.takeRandom = function takeRandom (items, num) {
  return _.take(_.sortBy(items, () => 0.5 - Math.random()), num)
};

rec.formatList = function formatList (list, num) {
  return rec.takeRandom(list, num).join(',')
}

rec.getSongs = function getSongs (conf, artists) {
  var token;
  return auth
    .getToken()
    .then(token => {
      var qs = _.merge(rec.convert(conf), { seed_artists: rec.formatList(artists, 5) });
      return auth.callSpotify({
        url: 'https://api.spotify.com/v1/recommendations',
        json: true,
        qs: qs
      }, token)
    })
    .catch(err => console.log(err))
}

module.exports = rec;
