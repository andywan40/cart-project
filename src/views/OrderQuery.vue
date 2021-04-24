<template>
  <div class="orderquery">
    <h1 class="title">訂單查詢</h1>
    <div class="select-div">
      <label class="label">訂單狀態: </label>
      <b-form-select
        class="order-query-select"
        v-model="selected"
        :options="options"
      ></b-form-select>
    </div>
    <div class="b-card-group-div">
      <b-card-group v-if="showInProgress" class="card-group">
        <b-card no-body :header="header1">
          <b-list-group flush>
            <b-list-group-item v-for="(item, i) in inProgressItems" :key="i">
              <order-status-card :item="item" status="inprogress" />
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
      <b-card-group v-if="showCompleted" class="card-group">
        <b-card no-body :header="header2">
          <b-list-group flush>
            <b-list-group-item v-for="(item, i) in completedItems" :key="i">
              <order-status-card :item="item" status="completed" />
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
import OrderStatusCard from "../components/OrderStatusCard.vue";
export default {
  name: "OrderQuery",
  components: {
    OrderStatusCard,
  },
  data() {
    return {
      selected: "all",
      header1: "進行中",
      header2: "已完成",
      options: [
        { text: "全部", value: "all" },
        { text: "進行中", value: "inprogress" },
        { text: "已完成", value: "completed" },
      ],
    };
  },
  computed: {
    showInProgress() {
      if (this.selected === "all" || this.selected === "inprogress")
        return true;
      return false;
    },
    showCompleted() {
      if (this.selected === "all" || this.selected === "completed") return true;
      return false;
    },
    inProgressItems() {
      let items = [];
      this.orders.forEach((order) => {
        if (order.status.code === 1 || order.status.code === 2) {
          items.push(order);
        }
      });
      return items;
    },
    completedItems() {
      let items = [];
      this.orders.forEach((order) => {
        if (order.status.code === 3 || order.status.code === 4) {
          items.push(order);
        }
      });
      return items;
    },
    orders() {
      return this.$store.getters.getOrders;
    },
  },
  created() {
    let orders = [
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
    ];
    this.$store.commit("setOrders", orders);
  },
};
</script>
<style>
.orderquery {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.orderquery .title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.orderquery .select-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.orderquery .label {
  font-size: 1.2rem;
  margin-right: 10px;
}

.orderquery .order-query-select {
  margin-bottom: 1rem;
  width: 25vw;
}

.orderquery .b-card-group-div {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.orderquery .card-group {
  width: 40vw;
}

.orderquery .card-header {
  text-align: start;
  background-color: rgba(61, 60, 60, 0.2);
  font-size: 1rem;
  font-weight: 600;
}

.orderquery .list-group-item {
  padding: 0;
  height: 8rem;
}
</style>