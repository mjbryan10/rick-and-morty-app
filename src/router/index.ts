import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/categories',
    name: 'Categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "[categories]" */ '../views/Categories.vue'),
  },
  {
    path: '/character/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue'),
    props: true,
  },
  {
    path: '/Characters/',
    name: 'Characters',
    component: () => import(/* webpackChunkName: "characters" */ '../views/Characters.vue'),
  },
  {
    path: '/random',
    name: 'Random',
    component: () => import(/* webpackChunkName: "random" */ '../views/Random.vue'),
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

export default router;
