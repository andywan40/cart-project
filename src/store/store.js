import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    user: "",
    isLoggedIn: false,
    menu: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoginStatus(state, payload) {
      state.isLoggedIn = payload;
    },
    setMenu(state, payload) {
      state.menu = payload;
    },
  },
  getters: {
    getUser(state){
      return state.user
    },
    getLoginStatus(state){
      return state.isLoggedIn
    },
    getMenu(state){
      return state.menu
    },
    
  }
})

export default store;