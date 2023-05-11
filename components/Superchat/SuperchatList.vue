<template>
  <div>
    <h1 class="header">
      栗国 Superchat
    </h1>
    <table class="sc-table">
      <tr class="sc-header">
        <th>昵称</th>
        <th>礼物总额</th>
        <th>sc内容</th>
        <th>日期</th>
      </tr>
      <tr v-for="sc in superchats" :key="sc.id" class="sc-item">
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

<script setup>
import moment from 'moment';
const API_URL = import.meta.env.VITE_API_URL;

const superchats = await (await fetch(`${API_URL}/superchat/all`)).json();

function formatDate(date) {
  return moment(date).format('YYYY/M/D');
}
</script>

<style>
.header {
  font-size: 16pt;
}

.sc-table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  min-width: 800px;
}

.sc-header {
  background: rgb(244 148 57);
  color: white;
  font-weight: bold;
  text-align: left;
}

.sc-item {
  border-bottom: 1px solid #dddddd;
  font-size: 12pt;
  text-align: left;
  vertical-align: middle;
}

.avatar {
  border: transparent;
  border-radius: 50%;
  display: inline-block;
  height: 40px;
  margin-left: 2px;
  margin-right: 2px;
  width: auto;
}

.sc-item:nth-of-type(odd) {
  background-color: #f3f3f3;
}

.sc-item:last-of-type {
  border-bottom: 2px solid rgb(244 148 57);
}
</style>
