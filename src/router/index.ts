import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Characterdex',
      content:
        'A homemade device to help you explore the known characters of the Rick and Morty universe!',
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "[categories]" */ '../views/Categories.vue'),
    meta: {
      title: 'Categories - Characterdex',
      content:
        'A launch pad to help you explore the characters of rick and morty by category',
    },
  },
  {
    path: '/character/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue'),
    props: true,
    meta: {
      title: 'Character Profile - Characterdex',
      content: 'The content entry for a character in the Characterdex',
    },
  },
  {
    path: '/Characters/',
    name: 'Characters',
    component: () => import(/* webpackChunkName: "characters" */ '../views/Characters.vue'),
    meta: {
      title: 'Characters - Characterdex',
      content: 'A selection of characters from within the Characterdex',
    },
  },
  {
    path: '/random',
    name: 'Random',
    component: () => import(/* webpackChunkName: "random" */ '../views/Random.vue'),
    meta: {
      title: 'Randomizer - Characterdex',
      content: 'The content entry for a random character in the Characterdex',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

/**
 * Targets appScreen and scrolls it to the top when the route changes.
 * This creates better UX and smoother loading.
 *
 * Unfortunately, unable to use $refs hook with current vue-router.
 * @see https://github.com/vuejs/composition-api/issues/404
 */
router.beforeEach((to, from, next) => {
  const appScreen = document.querySelector('.app-screen');
  if (appScreen) appScreen.scrollTop = 0;
  next();
});

/**
 * Uses the afterEach router method to update the document title for each route.
 * @see https://stackoverflow.com/a/51640162/12873927
 */
router.afterEach((to, from) => {
  /**
   * Use next tick to handle router history correctly
   * @see https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
   */
  Vue.nextTick(() => {
    document.title = to.meta.title || 'Rick and Morty - Characterdex';
  });
});

export default router;
