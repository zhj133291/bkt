import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import index from '@/page/index'
import branch from '@/page/branch'
import branchDetail from '@/page/branchDetail'
import user from '@/page/user'
import userDetail from '@/page/userDetail'
import creditReport from '@/page/creditReport'
import creditReviewReport from '@/page/creditReviewReport'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/',
      component: login,
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      children: [
        {
          name: 'branch',
          path: '/branch',
          component: branch
        },
        {
          name: 'user',
          path: '/user',
          component: user
        },
        {
          name: 'branchDetail',
          path: '/branchDetail',
          component: branchDetail
        },
        {
          name: 'userDetail',
          path: '/userDetail',
          component: userDetail
        },
        {
        	  name: 'creditReport',
          path: '/creditReport',
          component: creditReport
        },
        {
          name: 'creditReviewReport',
          path: '/creditReviewReport',
          component: creditReviewReport
        }
      ]
    }
  ]
})
