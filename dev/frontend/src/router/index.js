import Vue from 'vue';
import Router from 'vue-router';
import APP_CONFIG from '../app-config';

import Home from '@/components/home/Home.vue';
import Detail from '@/components/detail/Detail.vue';
import GeneralSettings from '@/components/edit/GeneralSettings.vue';
import ActivityList from '@/components/edit/ActivityList.vue';
import ActivitySettings from '@/components/edit/ActivitySettings.vue';
import TabContentsList from '@/components/edit/TabContentsList.vue';
import Media from '@/components/media/Media.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';

import store from '../store/store.js';

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
      path: '/edit',
      name: 'edit-home',
      components: {
        'page': Home,
        'section-top': GeneralSettings,
        'section-bottom': ActivityList,
      },
      meta: {requiresAuth: true},
    },
    {
      path: '/edit/detail/:id',
      name: 'edit-detail',
      components: {
        'page': Detail,
        'section-top': ActivitySettings,
        'section-bottom': TabContentsList,
      },
      meta: {requiresAuth: true},
    },
    {
      path: '/media',
      name: 'media',
      components: {'page': Media},
    },
    {
      path: '/login',
      name: 'login',
      components: {
        'page': Login,
        'section-top': GeneralSettings,
        'section-bottom': ActivityList,
      },
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

router.beforeEach((to, from, next) => {
  console.log('isAuthenticated:', store.state.isAuthenticated);
  if (to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.isAuthenticated) {
    console.log('router guard blocked. to: ', to);
    next({path: '/login'}); // , query: {redirect: to.fullPath}
  } else {
    console.log('router guard PASSED. to: ', to);
    const rootPath = to.path.substring(1, 5);
    if (rootPath === 'edit') {
      // turn edit mode on to display edit panel
      // store.commit('updateIsEditing', true)
      store.mutations.updateIsEditing(store.state, true);
    }
    next();
  }
});

export default router;
