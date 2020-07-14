import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';
import Characters from '../views/Characters.vue';
import Random from '../views/Random.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue'),
  },
  {
    path: '/character/:id',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/Characters/',
    name: 'Characters',
    component: Characters,
    // props: true,
  },
  {
    path: '/random',
    name: 'Random',
    component: Random,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
