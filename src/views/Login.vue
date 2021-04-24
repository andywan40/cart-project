<template>
  <div class="login">
    <div class="login-card">
      <p class="login-title">登入</p>
      <form class="login-form" @submit.prevent="handleFormSubmit">
        <input placeholder="輸入帳號" type="username" v-model="username" />
        <input placeholder="輸入密碼" type="password" v-model="password" />
        <div class="login-button-div">
          <button class="login-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      menu: [
        { text: "訂單查詢", link: "/cartproject/orderquery" },
        { text: "新增訂單", link: "/cartproject/createorder" },
      ],
      orders: [
        {
          name: "Livi優活 抽取式衛生紙(100抽x10包x10串/箱)",
          logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
          status: {
            code: 3,
            type: "已取消",
          },
          date: "107/6/12",
        },
        {
          name: "BALMUDA The Toaster 百慕達烤麵包機-黑色",
          logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
          status: {
            code: 2,
            type: "已成立",
          },
          date: "108/7/21",
        },
        {
          name: "贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...",
          logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
          status: {
            code: 1,
            type: "處理中",
          },
          date: "108/6/2",
        },
        {
          name: "Apple AirPds 2",
          logo: "https://static.oopocket.com/store/iconTreemall@3x.png",
          status: {
            code: 4,
            type: "已送達",
          },
          date: "108/3/02",
        },
      ],
    };
  },
  methods: {
    handleFormSubmit() {
      let username = this.$store.getters.getUsername;
      let password = this.$store.getters.getPassword;
      if (this.username === username && +this.password === password) {
        this.$store.commit("setLoginStatus", true);
        this.$store.commit("setMenu", this.menu);
        let oldOrders = this.$store.getters.getOrders;
        if (oldOrders.length === 0) {
          this.orders.forEach((order) => {
            order.id = uuid();
          });
          this.$store.commit("setOrders", this.orders);
        }
        this.$router.push({ name: "Home" });
      } else {
        alert("帳號或密碼錯誤！");
      }
      this.username = "";
      this.password = "";
    },
  },
};
</script>
<style>
.login {
  display: flex;
  justify-content: center;
  background-color: rgb(250, 246, 242);
}

.login-card {
  border: 1px solid black;
  border-radius: 6px;
  width: 50vw;
  height: 50vh;
}

.login-title {
  text-align: left;
  padding-left: 0.4rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgb(228, 228, 225);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login input {
  border: 1px solid black;
  margin-top: 1rem;
  border-radius: 3px;
  min-width: 70%;
  min-height: 40px;
}

.login-button-div {
  min-width: 70%;
  display: flex;
  justify-content: flex-end;
}

.login-button-div .login-button {
  margin-top: 2.5rem;
  border-radius: 5px;
  background-color: rgb(56, 56, 56);
  color: #fff;
  width: 30%;
  height: 55px;
  font-weight: 600;
}

.login-button-div .login-button:hover {
  background-color: rgb(22, 20, 20);
  box-shadow: 1px 1px 1px rgb(17, 15, 15);
}
</style>