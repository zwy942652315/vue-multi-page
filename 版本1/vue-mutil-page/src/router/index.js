import Vue from 'vue'
import Router from 'vue-router'
import index from '@C/index/index'
import my from '@C/my/my'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
