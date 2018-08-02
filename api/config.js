require('babel-polyfill');

if (!process.env.SERVERLESS_API_URL) {
  require('dotenv').load();
}

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'web',
    stage: process.env.STAGE || 'prod',
    port: process.env.PORT || 8080,
    apiHost: process.env.APIHOST || 'api',
    apiPort: process.env.APIPORT || 3030,
    baseURL: process.env.BASE_URL || '',
    rekRequestsLimit: 2000,
    contact: {
      sendgridApiKey: process.env.SENDGRID_API_KEY || 'voloviv@gmail.com',
      toEmail: process.env.TO_EMAIL || 'voloviv@gmail.com'
    },
    app: {
      title: 'voloviv.vom',
      description: 'Who is your Game Of Thrones doppelganger?',
      head: {
        titleTemplate: 'Atomizer - %s',
        meta: [
          {
            name: 'description',
            content: 'Playing around with Amazon Rekognition'
          },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'voloviv' }
          // {property: 'og:image', content: ''},
          // {property: 'og:locale', content: 'en_US'},
          // {property: 'og:title', content: 'Cycura Atomizer'},
          // {property: 'og:description', content: 'Fuzzer Platform'},
          // {property: 'og:card', content: 'summary'},
          // {property: 'og:site', content: '@cycurainc'},
          // {property: 'og:creator', content: '@cycurainc'},
          // {property: 'og:image:width', content: '239'},
          // {property: 'og:image:height', content: '53'}
        ]
      }
    }
  },
  environment
);
