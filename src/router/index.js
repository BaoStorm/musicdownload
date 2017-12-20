import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
// import Head from '@/components/header/head'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
