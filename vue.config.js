const SitemapPlugin = require('sitemap-webpack-plugin').default;

// TODO : Change routes from hardcoded to dynamically read from routes.
// also, ensure slugs like :id are not included.

// const routerPaths = require('./src/router/routes.js').default
//   .map((r) => r.path)
//    .filter((p) => !p.match(/\*/))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const routes = require('./src/router/routes.json');

const routerPaths = routes.map((route) => route.path);

const filteredPaths = routerPaths.filter((path) => !path.includes(':'));
// const routerPaths = ['/', '/random', '/characters', '/categories'];

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin(
        'https://rickandmorty-characterdex.netlify.app/',
        filteredPaths,
        {
          fileName: 'sitemap.xml',
          lastMod: true,
          changeFreq: 'monthly',
        },
      ),
    ],
  },
};
