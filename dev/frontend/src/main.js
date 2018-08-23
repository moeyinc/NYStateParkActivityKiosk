// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import _store from './store';
import VeeValidate from 'vee-validate';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons';
import VueQuillEditor from 'vue-quill-editor';
import mixin from '@/mixin';
import VueSession from 'vue-session';
import VueSimpleSVG from 'vue-simple-svg';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.component('icon', Icon);
Vue.use(VueQuillEditor);
Vue.mixin(mixin);
Vue.use(VueSession);
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
