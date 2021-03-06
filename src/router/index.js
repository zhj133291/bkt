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
import customerAccept from '@/page/customerAccept'
import customerDetail from '@/page/customerDetail'
import resetPwd from '@/page/resetPwd'
import pdf from '@/page/PDF'
import viewer from '@/page/viewer'
import analysis from "@/page/analysis"

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
        },
        {
          name: 'customerAccept',
          path: '/customerAccept',
          component: customerAccept
        },
        {
          name: 'customerDetail',
          path: '/customerDetail',
          component: customerDetail
        },
        {
          name: 'resetPwd',
          path: '/resetPwd',
          component: resetPwd
        },
				{
					path: '/pdf',
					name: 'pdf',
					component: pdf
				}, {
					path: '/viewer',
					name: 'viewer',
					component: viewer
				}, {
					path: '/analysis',
					name: 'analysis',
					component: analysis
				}
      ]
    }
  ]
})
