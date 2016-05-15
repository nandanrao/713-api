// spec

var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var _ = require('lodash');
var Promise = require('bluebird');
