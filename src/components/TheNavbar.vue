<template>
  <b-navbar class="navbar">
    <the-menu class="menu" :menuTitle="menuTitle" :menuItems="menuItems" />
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template #button-content>
          <b-icon-person-circle class="person-icon" />
        </template>
        <b-dropdown-item @click="handleShowInfo">個人資料</b-dropdown-item>
        <b-dropdown-item @click="handleLogout">登出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import TheMenu from "./TheMenu.vue";
export default {
  name: "TheNavbar",
  components: {
    TheMenu,
  },
  computed: {
    menuItems() {
      return this.$store.getters.getMenu;
    },
  },
  data() {
    return {
      menuTitle: "訂單管理",
    };
  },
  methods:{
    handleLogout(){
      let result = window.confirm("確定要登出嗎？");
      if(result){
        this.$store.commit("setLoginStatus", false);
        this.$router.push({name: "Login"});
      }
    },
    handleShowInfo(){
      this.$router.push({name: "PersonalInfo"})
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-left: 1rem;
  background-color: rgb(230, 247, 253);
}

.navbar .person-icon {
  font-size: 3rem;
  cursor: pointer;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>