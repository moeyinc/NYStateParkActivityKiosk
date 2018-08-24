// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import _store from './store/store';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons';
import mixin from '@/mixin';
import VueSimpleSVG from 'vue-simple-svg';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.component('icon', Icon);
Vue.mixin(mixin);
Vue.use(VueSimpleSVG);

const store = new Vuex.Store(_store);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {App},
});

// export default vueAuth
