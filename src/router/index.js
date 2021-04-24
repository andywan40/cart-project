import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cartproject',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
  },
  {
    path: '/cartproject/personalinfo',
    name: 'PersonalInfo',
    component: () => import('../views/PersonalInfo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

 router.beforeEach((to, from, next) => {
     if(to.matched.length === 0){
         next({name: 'Home'});
     }
     let isLoggedIn = store.getters.getLoginStatus;
     if (to.name !== 'Login' && !isLoggedIn) next({ name: 'Login' })
     else if (to.name === "Login" && isLoggedIn) next({name: 'Home'})
     else next()
    
})
    


export default router
