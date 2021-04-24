<template>
  <div id="app" :class="{ 'login-page': !isLoggedIn }">
    <div v-if="isLoggedIn" class="navbar">
      <the-menu class="menu" :menuTitle="menuTitle" :menuItems="menuItems" />
      <b-icon-person-circle @click="handleLogout" class="person-icon"/>
    </div>
    <router-view />
  </div>
</template>
<script>
import TheMenu from "./components/TheMenu.vue";

export default {
  name: "Home",
  components: {
    TheMenu,
  },
  data() {
    return {
      menuTitle: "訂單管理",
    };
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.getLoginStatus;
    },
    menuItems(){
      return this.$store.getters.getMenu;
    }
  },
  methods:{
    handleLogout(){
      let result = window.confirm("確定要登出嗎？");
      if(result){
        this.$store.commit("setLoginStatus", false);
        this.$router.push({name: "Login"});
      }
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

#app .navbar{
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-left: 1rem;
  background-color: rgb(230, 247, 253);
}

#app .navbar .person-icon{
  font-size: 3rem;
  cursor: pointer;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
