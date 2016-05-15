// spec

var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var _ = require('lodash');
var Promise = require('bluebird');


var recommender = require('./recommender');

describe('recommender', () => {

  describe('takeRandom',() => {
    it('takes to proper amount', () => {
      var ans = recommender.takeRandom(['pop', 'rock', 'glam', 'rap', 'europop'], 2)
      expect(ans.length).to.equal(2);
    })
  })

  describe('takeRandom',() => {
    it('filters by proper genres', () => {
      var ans = recommender.formatList(['rock', 'glam'], ['dance pop', 'rock', 'glam', 'rap', 'europop'], 3)
      expect(ans).to.contain('glam')
      expect(ans).to.be.a.string;
    })
  })

  describe('getRange', () => {
    it('does things', () => {
      var ans = recommender.getRange('speechiness', .6);
      expect(ans).to.deep.equal({
        max_speechiness: 0.66,
        min_speechiness: 0.54
      })
    })
  })

  describe('convertObject', () => {
    it('does thigns', () => {
      var cnf = {'acousticness': 0.054085000000000001,
                 'danceability': 0.71066666666666656,
                 'energy': 0.78449999999999998,
                 'instrumentalness': 0.038548516666666664,
                 'liveness': 0.22714999999999999,
                 'loudness': -6.2898333333333332,
                 'popularity': 69.666666666666671,
                 'speechiness': 0.061950000000000005,
                 'tempo': 115.81750000000001,
                 'valence': 0.56716666666666671}
      var ans = recommender.convert(cnf);
      expect(ans).to.have.property('min_acousticness')
      console.log(ans)
    })
  })

})
