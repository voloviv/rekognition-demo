/* @flow */

module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  protocol: 'http',
  apiHost: process.env.NODE_HOST || 'localhost',
  apiPort: '3030',
  GA_KEY: '',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'voloviv - who is your Game Of Thrones Doppelganger?',
    titleTemplate: 'voloviv - %s',
    meta: [
      {
        name: 'description',
        content:
          'An open source project backend / front end that uses facial recognition tech to compare detected faces to Game of Thrones Characters.'
      }
    ]
  }
};
