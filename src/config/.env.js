/* @flow */

const merge = require('lodash/fp/merge');

require('dotenv').load();

const defaultConfig = require('./default');

module.exports = merge(defaultConfig, {
  GA_KEY: process.env.GA_KEY || 'UA-121782173-1'
});
