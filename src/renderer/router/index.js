import Vue from 'vue'
import Router from 'vue-router'
import home from '@/containers/home.vue'
import core from '@/containers/core.vue'
import work from '@/containers/work.vue'
import note from '@/containers/note.vue'
import custom from '@/containers/iview-custom.vue'
import login from '@/containers/login.vue'
import contral from '@/containers/contral.vue'
var session = require('electron').remote.session;


Vue.use(Router)

export default new Router({
  // mode: "history",
  mode: "hash",
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      beforeEnter: (to, from, next) => {
        session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
          if (cookies) {
            // console.log(cookies);
            for (var i = 0; i < cookies.length; i++) {
              var cur = cookies[i];
              if (cur.name=='admin') {
                next();
                break;
              }
            }
          }else{
            next('./login')
          }
        })
      }
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
