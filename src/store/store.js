import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    user: "",
    isLoggedIn: false,
    menu: [],
    orders: [],
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
    setOrders(state, payload) {
        state.orders = payload;
      },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoginStatus(state) {
      return state.isLoggedIn;
    },
    getMenu(state) {
      return state.menu;
    },
    getOrders(state) {
        return state.orders;
      },
  },
});

export default store;
