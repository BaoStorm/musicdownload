import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
// import Head from '@/components/header/head'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
