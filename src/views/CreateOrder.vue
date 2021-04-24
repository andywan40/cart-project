<template >
  <div class="createorder">
    <div>
      <h1 class="title">新增訂單</h1>
      <b-icon-plus-circle-fill id="tooltip-target-icon" @click="showTable" />
      <b-tooltip target="tooltip-target-icon" triggers="hover">
        新增多筆
      </b-tooltip>
    </div>
    <b-container fluid class="container">
      <form
        @submit.prevent="handleSingleOrderSubmit"
        class="form"
        v-if="!displayTable"
      >
        <b-row class="row">
          <b-col sm="3">
            <label for="itemName">{{ itemNameText }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input name="itemName" v-model="itemName"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="row">
          <b-col sm="3">
            <label for="itemLogoLink">{{ itemLogoLinkText }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              name="itemLogoLink"
              v-model="itemLogoLink"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="row">
          <b-col sm="3">
            <label for="orderStatus">{{ orderStatusText }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              name="orderStatus"
              v-model="orderStatus"
              :options="orderStatusOptions"
            ></b-form-select>
          </b-col>
        </b-row>
        <b-button
          class="submit-btn"
          variant="outline-success"
          size="lg"
          type="submit"
        >
          新增</b-button
        >
      </form>
      <div v-if="displayTable">
        <b-button @click="addDataToTable" variant="outline-primary" size="sm"
          >新增</b-button
        >
        <Table
          class="tabulator"
          v-model="tabledata"
          :options="options"
          ref="tabulator"
          :integration="{ updateStrategy: 'UPDATE' }"
        />
        <b-button
          class="submit-btn"
          variant="outline-success"
          size="lg"
          @click="handleMultipleOrdersSubmit"
        >
          新增全部訂單</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { TabulatorComponent } from "vue-tabulator";
import { v4 as uuid } from "uuid";
export default {
  name: "CreateOrder",
  components: {
    Table: TabulatorComponent,
  },
  data() {
    return {
      itemNameText: "商品名稱",
      itemName: "",
      itemLogoLinkText: "圖示連結",
      itemLogoLink: "",
      orderStatusText: "訂單狀態",
      orderStatus: {
        code: 1,
        type: "處理中",
      },
      orderStatusOptions: [
        {
          text: "處理中",
          value: {
            code: 1,
            type: "處理中",
          },
        },
        {
          text: "已成立",
          value: {
            code: 2,
            type: "已成立",
          },
        },
        {
          text: "已取消",
          value: {
            code: 3,
            type: "已取消",
          },
        },
        {
          text: "已送達",
          value: {
            code: 4,
            type: "已送達",
          },
        },
      ],
      displayTable: false,
      table: null,
      tabledata: [],
      options: {
        height: "300px",
        layout: "fitColumns",
        layoutColumnsOnNewData: true,
        reactiveData: true,
        columns: [
          { title: "商品名稱", field: "name", editor: "input", editable: true },
          { title: "圖示連結", field: "logo", editor: "input", editable: true },
          {
            title: "訂單狀態",
            field: "status",
            editor: "select",
            editorParams: {
              values: [
                {
                  label: "處理中",
                  value: 1,
                },
                {
                  label: "已成立",
                  value: 2,
                },
                {
                  label: "已取消",
                  value: 3,
                },
                {
                  label: "已送達",
                  value: 4,
                },
              ],
            },
          },
        ],
      },
    };
  },
  methods: {
    handleSingleOrderSubmit() {
      if (!this.itemName) {
        alert("請填入商品名稱");
        return;
      }
      if (!this.itemLogoLink) {
        alert("請填入圖示連結");
        return;
      }

      try {
        let currentOrders = this.$store.getters.getOrders;
        let newOrder = {
          name: this.itemName,
          logo: this.itemLogoLink,
          status: {
            code: this.orderStatus.code,
            type: this.orderStatus.type,
          },
          date: this.today,
          id: uuid(),
        };
        let newOrders = [...currentOrders, newOrder];
        this.$store.commit("setOrders", newOrders);
        this.itemName = "";
        this.itemLogoLink = "";
        alert("新增成功");
      } catch (e) {
        alert("新增失敗");
      }
    },
    showTable() {
      this.displayTable = true;
    },
    addDataToTable() {
      this.table = this.$refs.tabulator.getInstance();
      this.table.addData({ name: "", logo: "", status: 1 });
    },
    handleMultipleOrdersSubmit() {
      if (!this.table || this.table.getData().length === 0) {
        alert("請至少新增一筆訂單");
        return;
      }
      try {
        let datas = this.table.getData();
        let newOrders = [];
        let dataValidated = true;
        for (let i = 0; i < datas.length; i++) {
          let data = datas[i];
          if (!data.name) {
            dataValidated = false;
            alert("請輸入商品名稱！");
            break;
          }
          let status = {};
          if (data.status === 1) {
            status = {
              code: 1,
              type: "處理中",
            };
          } else if (data.status === 2) {
            status = {
              code: 2,
              type: "已成立",
            };
          } else if (data.status === 3) {
            status = {
              code: 3,
              type: "已取消",
            };
          } else if (data.status === 4) {
            status = {
              code: 4,
              type: "已送達",
            };
          }
          let newOrder = {
            ...data,
            date: this.today,
            status: status,
            id: uuid(),
          };
          newOrders.push(newOrder);
        }
        if (dataValidated) {
          this.table.clearData();
          let currentOrders = this.$store.getters.getOrders;
          let toSubmitOrders = [...currentOrders, ...newOrders];
          this.$store.commit("setOrders", toSubmitOrders);
          alert(`新增${newOrders.length}筆訂單成功`);
        }
      } catch (e) {
        console.log(e);
        alert(`新增訂單失敗`);
      }
    },
  },
  computed: {
    today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear() - 1911;
      today = `${yyyy}/${mm}/${dd}`;
      return today;
    },
  },
};
</script>

<style lang="scss">
@import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";
.createorder {
  width: 50vw;
  margin: auto auto;
}

.createorder .title {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: inline-block;
}

#tooltip-target-icon {
  font-size: 1.8rem;
  margin-left: 1.5rem;
  color: rgb(29, 135, 221);
  cursor: pointer;
}

#tooltip-target-icon:hover {
  color: rgb(11, 104, 180);
}

.createorder .row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.createorder .submit-btn {
  margin-top: 2rem;
}

.createorder .tabulator {
  margin-top: 1rem;
}
</style>