<template>
  <div class="personalinfo">
    <h1 class="title">個人資料</h1>
    <form class="personal-info-form" @submit.prevent="handleFormSubmit">
      <input placeholder="輸入新帳號" type="username" v-model="username" />
      <input placeholder="輸入新密碼" type="password" v-model="password" />
      <div class="submit-button-div">
        <button class="submit-button" type="submit">更改</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleFormSubmit() {
      if (!this.username || !this.password) {
        alert("請填入新帳號和密碼！");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.username)) {
        alert("帳號必須為email");
        return;
      }
      if (!/^\d+$/.test(this.password)) {
        alert("密碼必須都為數字");
        return;
      }
      this.$store.commit("setUsername", this.username);
      this.$store.commit("setPassword", +this.password);
      this.username = "";
      this.password = "";
      alert("成功修改帳號密碼!");
    },
  },
};
</script>
<style>
.personalinfo .title{
    margin-top: 1rem;
    margin-bottom: 2rem;
}
.personalinfo .personal-info-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.personalinfo .personal-info-form input{
    border: 1px solid black;
  margin-bottom: 1rem;
  border-radius: 3px;
  min-width: 35%;
  min-height: 50px;
  padding: 5px;
}

.submit-button-div {
  min-width: 35%;
  display: flex;
  justify-content: flex-end;
}

.personalinfo .personal-info-form .submit-button{
  border-radius: 5px;
  background-color: rgb(56, 56, 56);
  color: #fff;
  width: 30%;
  height: 55px;
  font-weight: 600;
}

.personalinfo .personal-info-form .submit-button:hover {
  background-color: rgb(22, 20, 20);
  box-shadow: 1px 1px 1px rgb(17, 15, 15);
}
</style>