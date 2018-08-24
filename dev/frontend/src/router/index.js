import Vue from 'vue';
import Router from 'vue-router';
import APP_CONFIG from '../app-config';

const dt = APP_CONFIG.DESIGN_THEME;
const Home = require(`@/components/themes/${dt}/home/Home`);
const Detail = require(`@/components/themes/${dt}/detail/Detail`);
const NotFound = require(`@/components/common/NotFound`);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'home'},
    },
    {
      path: '/home',
      name: 'home',
      components: {'page': Home},
    },
    {
      path: '/detail/:id',
      name: 'detail',
      components: {'page': Detail},
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '*',
      redirect: {name: 'not-found'},
    },
  ],
});

export default router;
