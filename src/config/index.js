/* @flow */

if (__DEV__) {
  module.exports = require('./.env');
} else {
  module.exports = require('./prod');
}
