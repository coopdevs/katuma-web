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
    head: {
      titleTemplate: 'Katuma: %s',
      meta: [
        {name: 'description', content: description},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Katuma'},
        {property: 'og:image', content: logo},
        {property: 'og:locale', content: 'es_ES'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@katuma_org'},
        {property: 'og:creator', content: '@katuma_org'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:image', content: logo},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    },
  }
}, environment);
