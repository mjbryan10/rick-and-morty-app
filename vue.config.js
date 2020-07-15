const SitemapPlugin = require('sitemap-webpack-plugin').default;

// TODO : Change routes from hardcoded to dynamically read from routes.
// also, ensure slugs like :id are not included.

// const routerPaths = require('./src/router/routes.js').default
//   .map((r) => r.path)
//   .filter((p) => !p.match(/\*/));

const routerPaths = ['/', '/random', '/character', '/categories'];

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin(
        'https://rickandmorty-characterdex.netlify.app/',
        routerPaths,
        {
          fileName: 'sitemap.xml',
          lastMod: true,
          changeFreq: 'monthly',
        },
      ),
    ],
  },
};
