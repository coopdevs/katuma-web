require('babel/polyfill');

const title = 'katuma';
const description = 'Skip the middleman, buy directly from the providers.';
const logo = 'https://pbs.twimg.com/profile_images/439758163680571393/4-Ety8fn.png';

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  apiVersion: process.env.APIVERSION || 'v1',
  app: {
    title: title,
    description: description,
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Katuma',
        'og:image': logo,
        'og:locale': 'es_ES',
        'og:title': title,
        'og:description': description,
        'twitter:card': 'summary',
        'twitter:site': '@katuma_org',
        'twitter:creator': '@katuma_org',
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': logo,
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
