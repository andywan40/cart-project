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
          <b-button
            @click="handleUpdateStatus"
            variant="outline-warning"
            size="sm"
            class="update-button"
          >
            {{ updateButtonText
            }}<b-icon-pencil-square class="pencil-icon"></b-icon-pencil-square
          ></b-button>

          <b-list-group flush>
            <b-list-group-item v-for="item in inProgressItems" :key="item.id">
              <order-status-card :item="item" :status="inProgressItemsStatus" />
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
      <b-card-group v-if="showCompleted" class="card-group">
        <b-card no-body :header="header2">
          <b-list-group flush>
            <b-list-group-item v-for="item in completedItems" :key="item.id">
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
      inProgressItemsStatus: "inprogress",
      updateButtonText: "更新狀態",
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
      items.sort((a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return bDate - aDate;
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
  methods: {
    handleUpdateStatus() {
      if (this.inProgressItemsStatus === "inprogress") {
        this.inProgressItemsStatus = "editing";
        this.updateButtonText = "取消訂單";
      } else {
        this.inProgressItemsStatus = "inprogress";
        this.updateButtonText = "更新狀態";
        this.cancelOrders(this.$store.getters.getToCancelOrders);
        this.$store.commit("setToCancelOrders", []);
      }
    },
    cancelOrders(ids) {
      for (let i = 0; i < this.orders.length; i++) {
        if (ids.includes(this.orders[i].id)) {
          this.orders[i].status = {
            type: "已取消",
            code: 3,
          };
        }
      }
    },
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
  width: 50vw;
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

.update-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pencil-icon {
  margin-left: 0.3rem;
}

@media only screen and (max-width: 1000px) {
  .orderquery .card-group {
    width: 60vw;
  }
}

@media only screen and (max-width: 600px) {
  .orderquery .card-group {
    width: 70vw;
  }
}
</style>