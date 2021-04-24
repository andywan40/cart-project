<template>
  <b-dropdown id="menu-dropdown" :text="menuTitle">
    <b-dropdown-item v-for="item in menuItems" :key="item.text">
      <router-link :to="item.link">{{ item.text }}</router-link>
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
export default {
  name: "TheMenu",
  data() {
    return {};
  },
  props: {
    menuTitle: String,
    menuItems: Array,
  },
};
</script>
<style>
#menu-dropdown .dropdown-menu.show {
  background-color: #70767e;
}
#menu-dropdown .dropdown-menu .dropdown-item a {
  color: white;
}
#menu-dropdown .dropdown-menu .dropdown-item:hover {
  background-color: #7b8086;
}

#menu-dropdown .dropdown-menu .dropdown-item .router-link-active {
  font-size: 1.2rem;
  font-weight: 700;
}
</style>