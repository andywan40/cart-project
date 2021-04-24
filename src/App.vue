<template>
  <div id="app" :class="{ 'login-page': !isLoggedIn }">
    <the-navbar v-if="isLoggedIn" class="navbar"/>
    <router-view />
  </div>
</template>
<script>
import TheNavbar from "./components/TheNavbar.vue";
export default {
  name: "Home",
  components: {
    TheNavbar
  },
  data() {
    return {
    };
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.getLoginStatus;
    },
    menuItems(){
      return this.$store.getters.getMenu;
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6fdff !important;
  height: 100vh;
}

</style>
