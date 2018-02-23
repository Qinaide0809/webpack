import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/header/Header'
import Fotter from '@/components/fotter/Fotter'
import Index from '@/components/view/Index'
import Login  from '@/components/view/Login'
import sidebar  from '@/components/modules/sidebar'
import anmation  from '@/components/modules/anmation'
import userNew  from '@/components/view/user/userNew'
import userRegister  from '@/components/view/user/userRegister'
import userList  from '@/components/view/user/userList'
import userDetails  from '@/components/view/user/userDetails'
import roleNew  from '@/components/view/role/roleNew'
import roleList  from '@/components/view/role/roleList'
import roleResource  from '@/components/view/role/roleResource'
import resourceList  from '@/components/view/resource/resourceList'
import resourceNew  from '@/components/view/resource/resourceNew'
Vue.use(Router)

export default new Router({
  routes: [
    {
      /*
     * 名称：默认页面
     * 开发时间：2012：13：13日
     * 编写人：刘远健
     */
      path: '/view/Index',
      name: 'Index',
      components: {
        default: Index,
        headers: Header
      }
    },
    {
      /*
     * 名称：用户登陆
     * 开发时间：2012：13：13日
     * 编写人：刘远健
     */
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('accessToken') == null || !sessionStorage.getItem('accessToken')) {
          next();
        } else {
          next({
            path: '/view/Index',
            query: { redirect: to.fullPath }
          })
        }
      }
    },
    {
      /*
      * 名称：导航
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/header/Header',
      name: 'Header',
      components: {
        default: Header,
        headers: Header
      }
    },
    {
      /*
      * 名称：底部
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/fotter/Fotter',
      name: 'Fotter',
      components: {
        default: Fotter,
        headers: Header
      }
    },
    {
      /*
      * 名称：右侧菜单
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/modules/sidebar',
      name: 'sidebar',
      components: {
        default: sidebar,
        headers: Header
      }
    },
    {
      /*
      * 名称：开场动画
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/modules/anmation',
      name: 'anmation',
      components: {
        default: anmation
      }
    },
    {//用户
      /*
      * 名称：新增用户
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/user/userNew',
      name: 'userNew',
      components: {
        default: userNew,
        headers: Header
      }
    },
    {
      /*
      * 名称：用户注册//目前没有这页面（备用）
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/user/userRegister',
      name: 'userRegister',
      component: userRegister,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('accessToken') == null || !sessionStorage.getItem('accessToken')) {
          next();
        } else {
          next({
            path: '/view/Index',
            query: { redirect: to.fullPath }
          })
        }
      }
    },
    {
      /*
      * 名称：用户列表
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/user/userList',
      name: 'userList',
      components: {
        default: userList,
        headers: Header
      }
    },
    {
      /*
      * 名称：用户详情
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/user/userDetails',
      name: 'userDetails',
      components: {
        default: userDetails,
        headers: Header
      }
    },
    {//角色
       /*
       * 名称：新增角色
       * 开发时间：2012：13：13日
       * 编写人：刘远健
       */
      path: '/view/role/roleNew',
      name: 'roleNew',
      components: {
        default: roleNew,
        headers: Header
      }
    },
    {
      /*
      * 名称：角色列表
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/role/roleList',
      name: 'roleList',
      components: {
        default: roleList,
        headers: Header
      }
    },
    {
      /*
      * 名称：角色权限关联
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/role/roleResource',
      name: 'roleResource',
      components: {
        default: roleResource,
        headers: Header
      }
    },
    {//资源
      /*
      * 名称：资源列表
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/resource/resourceList',
      name: 'resourceList',
      components: {
        default: resourceList,
        headers: Header
      }
    },
    {
      /*
      * 名称：新增资源节点
      * 开发时间：2012：13：13日
      * 编写人：刘远健
      */
      path: '/view/resource/resourceNew',
      name: 'resourceNew',
      components: {
        default: resourceNew,
        headers: Header
      }
    }

  ],
})
