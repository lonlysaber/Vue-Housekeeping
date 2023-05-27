import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-house' }
    }]
  },

  {
    path: '/customermg',
    component: Layout,
    redirect: '/customermg',
    children: [{
      path: '',
      name: 'customermg',
      component: () => import('@/views/customer/index'),
      meta: { title: '客户管理', icon: 'el-icon-s-custom' }
    }]
  },
  {
    path: '/keepermg',
    component: Layout,
    redirect: '/keepermg',
    children: [{
      path: '',
      name: 'keepermg',
      component: () => import('@/views/keeper/index'),
      meta: { title: '服务人员管理', icon: 'el-icon-service' }
    }]
  },
  
  {
    path: '/ordermg',
    component: Layout,
    redirect: '/ordermg',
    children: [{
      path: '',
      name: 'ordermg',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: 'el-icon-s-order' }
    }]
  },
  // {
  //   path: '/newsmg',
  //   component: Layout,
  //   redirect: '/newsmg',
  //   children: [{
  //     path: '',
  //     name: 'newsmg',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '资讯管理', icon: 'el-icon-news' }
  //   }]
  // },
  // {
  //   path: '/needprocess',
  //   component: Layout,
  //   redirect: '/needprocess',
  //   children: [{
  //     path: '',
  //     name: 'needprocess',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '需求审核', icon: 'el-icon-chat-dot-square' }
  //   }]
  // },
  {
    path: '/leaveWord',
    component: Layout,
    redirect: '/leaveWord',
    children: [{
      path: '',
      name: 'leaveWord',
      component: () => import('@/views/leaveWord/index'),
      meta: { title: '留言处理', icon: 'el-icon-warning' }
    }]
  },
  // {
  //   path: '/incomeshow',
  //   component: Layout,
  //   redirect: '/incomeshow/table',
  //   meta: { title: '收支展示', icon: 'el-icon-s-data' },
   
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'el-icon-pie-chart' }
  //     }
  //   ]
  // },
  // {
  //   path: '/my',
  //   component: Layout,
  //   redirect: '/my',
  //   children: [{
  //     path: '',
  //     name: 'my',
  //     component: () => import('@/views/my/index'),
  //     meta: { title: '个人中心', icon: 'user' }
  //   }]
  // },
  
  
 
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

 

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
