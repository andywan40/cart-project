<template>
  <div class="orderstatuscard">
    <div class="div-1">
      <img
        class="logo-img"
        :class="{ 'completed-logo': !inprogress }"
        :src="logo"
      />
    </div>
    <div class="div-2">
      <div class="span-div">
        <span class="span-1" :class="{ 'in-progress-span': inprogress }">{{
          type
        }}</span>
        <span v-if="inprogress" class="span-2">預計出貨：{{ date }}</span>
      </div>
      <p>{{ name }}</p>
    </div>
    <div class="div-3">
        <b-icon-chevron-right class="chevron-right-icon"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderStatusCard",
  props: {
    item: Object,
    status: String,
  },
  data() {
    return {
      type: this.item.status.type,
      date: this.item.date,
      name: this.item.name,
      logo: this.item.logo,
    };
  },
  computed: {
    inprogress() {
      return this.status === "inprogress";
    },
  },
};
</script>
<style>
.orderstatuscard {
  display: flex;
  justify-content: center;
  height: 100%;
}

.orderstatuscard .div-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 30%;
}

.orderstatuscard .div-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  text-align: start;
  width: 60%;
}

.orderstatuscard .div-3 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 10%;
}

.orderstatuscard .div-3 .chevron-right-icon{
  font-size: 1.5rem;
}

.orderstatuscard .div-2 .span-div {
  font-weight: 500;
  width: 100%;
}

.orderstatuscard .div-2 .span-div .in-progress-span {
  color: rgb(22, 150, 22);
}

.orderstatuscard .div-2 p {
  width: 70%;
}

.orderstatuscard .span-1 {
  display: inline-block;
  width: 30%;
}

.orderstatuscard .span-2 {
  display: inline-block;
  width: 70%;
}

.orderstatuscard p {
  font-size: 1rem;
}

.orderstatuscard .logo-img {
  width: 5rem;
  height: 5rem;
}

.orderstatuscard .logo-img.completed-logo {
  width: 5rem;
  height: 5rem;
  filter: grayscale(100%);
}
</style>