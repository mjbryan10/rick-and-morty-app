// TODO : See if this is appropiate import for Index.ts
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
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

module.exports = { default: routes };
