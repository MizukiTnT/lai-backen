import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/release',
    component: Layout,
    redirect: '/release/plate',
    name: 'Release',
    meta: { title: '信息发布', icon: 'example' },
    children: [
      {
        path: 'plate',
        name: 'Plate',
        component: () => import('@/views/release/plate'),
        meta: { title: '平台信息发布', icon: 'table' }
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/release/news'),
        meta: { title: '新闻信息发布', icon: 'tree' }
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/release/recommend'),
        meta: { title: '专栏编辑' }
      }
    ]
  },

  {
    path: '/information',
    component: Layout,
    redirect: '/information/article',
    name: 'Information',
    meta: { title: '信息审核' },
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/information/article'),
        meta: { title: '文章审核', icon: 'form' }
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/information/report'),
        meta: { title: '举报审核' }
      },
      {
        path: 'reply',
        name: 'reply',
        component: () => import('@/views/information/post'),
        meta: { title: '发帖审核' }
      },
      {
        path: 'advice',
        name: 'advice',
        component: () => import('@/views/information/advice'),
        meta: { title: '意见审核' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/user/',
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'search',
        component: () => import('@/views/user/search'), // Parent router-view
        name: 'user',
        meta: { title: '用户管理' },
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  base: '/backend'
})
