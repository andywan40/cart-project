import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cartproject',
    name: 'Home',
    component: Home
  },
  {
    path: '/cartproject/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/cartproject/orderquery',
    name: 'OrderQuery',
    component: () => import('../views/OrderQuery.vue')
  },
  {
    path: '/cartproject/createorder',
    name: 'CreateOrder',
    component: () => import('../views/CreateOrder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
