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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//     let isLoggedIn = store.getters.getLoginStatus;
//     let accessLogin = false;
//     if (to.name === "Login" && !isLoggedIn ){
//         accessLogin = true;
//         return next({name: "Login"});
//     }
//     if (to.name === "Login" && isLoggedIn){
//         return next({name: "Home"});
//     }

//     if ( !isLoggedIn ){
//         return next({name: "Login"})
//     }else{
//         return next();
//     }





    // if (to.name !== "Login" && !isLoggedIn){
    //     return next({name: "Login"})
    // } else if (to.name === "Login" && isLoggedIn) {
    //   // Redirect user to homepage
    //   return next({path: '/'})
    // }else if ( to.name === "Login" && !isLoggedIn){
    //     return next({name: "Login"})
    // }  
    // // Let the user pass
    
// })
    


export default router
