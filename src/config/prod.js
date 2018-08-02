/* @flow */

const merge = require('lodash/fp/merge');

const defaultConfig = require('./.env');

module.exports = merge(defaultConfig, {
  // Over write default settings here...
});
