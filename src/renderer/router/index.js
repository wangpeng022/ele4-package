import Vue from 'vue'
import Router from 'vue-router'
import home from '@/containers/home.vue'
import core from '@/containers/core.vue'
import work from '@/containers/work.vue'
import note from '@/containers/note.vue'
import custom from '@/containers/iview-custom.vue'
import login from '@/containers/login.vue'
import contral from '@/containers/contral.vue'

Vue.use(Router)

export default new Router({
  // mode: "history",
  mode: "hash",
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
    },
    {
      path: '/core',
      name: 'core',
      component: core,
    },
    {
      path: '/work',
      name: 'work',
      component: work,
    },
    {
      path: '/note',
      name: 'note',
      component: note,
    },
    {
      path: '/custom',
      name: 'custom',
      component: custom,
    },
    {
      path: '/contral',
      name: 'contral',
      component: contral,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
