<template>
  <div>
    <h1 class="header">栗国 Superchat</h1>
    <table class="sc-table">
      <tr class="sc-header">
        <th>昵称</th>
        <th>礼物总额</th>
        <th>sc内容</th>
        <th>日期</th>
      </tr>
      <tr v-for="sc in scList" v-bind:key="sc.id" class="sc-item">
        <td>
          <!-- <img class="avatar" :src="`https://apic.douyucdn.cn/upload/${sc.avatar}_small.jpg`" alt="avatar" loading="lazy" />  -->
          <span class="nickname"> {{ sc.belongs_to_user }} </span>
        </td>
        <td>{{ sc.total_price }}</td>
        <td>{{ sc.text }}</td>
        <td>{{ formatDate(sc.created_at) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import DataService from "../../service/DataService";
import moment from "moment";

export default {
  data() {
    return {
      scList: [],
    };
  },
  props: {},
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY/M/D");
    },

    loadScList() {
      DataService.getAllSc()
        .then((response) => {
          this.scList = response.data;
          console.log(this.scList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadScList();
  },
};
</script>

<style>
.header {
  font-size: 16pt;
}

.sc-table {
  border-collapse: collapse;
  min-width: 800px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.sc-header {
  color: white;
  font-weight: bold;
  text-align: left;
  background: rgb(244 148 57);
}

.sc-item {
  text-align: left;
  border-bottom: 1px solid #dddddd;
  font-size: 12pt;
  vertical-align: middle;
}

.avatar {
  height: 40px;
  width: auto;
  display: inline-block;
  border-radius: 50%;
  margin-left: 2px;
  margin-right: 2px;
  border: transparent;
}

.sc-item:nth-of-type(odd) {
  background-color: #f3f3f3;
}

.sc-item:last-of-type {
  border-bottom: 2px solid rgb(244 148 57);
}
</style>
