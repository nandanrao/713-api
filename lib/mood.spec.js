'use strict';

// spec

var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var _ = require('lodash');
var Promise = require('bluebird');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb29kLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLElBQUksT0FBTyxRQUFRLE1BQVIsQ0FBWDtBQUNBLEtBQUssR0FBTCxDQUFTLFFBQVEsWUFBUixDQUFUO0FBQ0EsSUFBSSxTQUFTLEtBQUssTUFBbEI7QUFDQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJLGFBQWEsUUFBUSxZQUFSLENBQWpCO0FBQ0EsSUFBSSxJQUFJLFFBQVEsUUFBUixDQUFSO0FBQ0EsSUFBSSxVQUFVLFFBQVEsVUFBUixDQUFkIiwiZmlsZSI6Im1vb2Quc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNwZWNcblxudmFyIGNoYWkgPSByZXF1aXJlKCdjaGFpJyk7XG5jaGFpLnVzZShyZXF1aXJlKCdzaW5vbi1jaGFpJykpO1xudmFyIGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xudmFyIHNpbm9uID0gcmVxdWlyZSgnc2lub24nKTtcbnZhciBwcm94eXF1aXJlID0gcmVxdWlyZSgncHJveHlxdWlyZScpO1xudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbnZhciBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbiJdfQ==