import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
  state: {
    username: "andywan40@gmail.com",
    password: 12345,
    isLoggedIn: false,
    menu: [],
    orders: [],
    toCancelOrders: [],
  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
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
    setToCancelOrders(state, payload) {
      state.toCancelOrders = payload;
    },
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getPassword(state) {
      return state.password;
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
    getToCancelOrders(state) {
      return state.toCancelOrders;
    },
  },
});

export default store;
