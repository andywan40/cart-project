import Vue from "vue";
import {
  BootstrapVue,
  BIconPersonCircle,
  BIconChevronRight,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/store";
import App from "./App.vue";
import router from "./router";

Vue.use(BootstrapVue);
Vue.component("BIconPersonCircle", BIconPersonCircle);
Vue.component("BIconChevronRight", BIconChevronRight);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
