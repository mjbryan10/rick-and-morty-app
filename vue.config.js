const SitemapPlugin = require('sitemap-webpack-plugin').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const routes = require('./src/router/sitemap.json');

const routerPaths = routes.map((route) => route.path);

const filteredPaths = routerPaths.filter((path) => !path.includes(':'));

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
