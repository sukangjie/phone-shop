import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'Index',
          component: Index,
        }, {
          path: '/product/:id',
          name: 'Product',
          component: () => import('../views/Product.vue')
        }, {
          path: '/detail/:id',
          name: 'Detail',
          component: () => import('../views/Detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/Cart.vue')
    }
  ]
});