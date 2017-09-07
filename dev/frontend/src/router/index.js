import Vue    from 'vue'
import Router from 'vue-router'
import Home   from '@/components/home/Home.vue'
import Detail from '@/components/detail/Detail.vue'
import GeneralSettings from '@/components/edit/GeneralSettings.vue'
import ActivityList    from '@/components/edit/ActivityList.vue'
import ActivitySettings from '@/components/edit/ActivitySettings.vue'
import TabContentsList from '@/components/edit/TabContentsList.vue'
import Media    from '@/components/media/Media.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      components: {'page': Home}
    },
    {
      path: '/detail/:id',
      name: 'detail',
      components: {'page': Detail}
    },
    {
      path: '/edit',
      name: 'edit-home',
      components: {
        'page': Home,
        'section-top': GeneralSettings,
        'section-bottom': ActivityList
      }
    },
    {
      path: '/edit/detail/:id',
      name: 'edit-detail',
      components: {
        'page': Detail,
        'section-top': ActivitySettings,
        'section-bottom': TabContentsList
      }
    },
    {
      path: '/media',
      name: 'media',
      components: {'page': Media}
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: {name: 'not-found'}
    }
  ]
})
