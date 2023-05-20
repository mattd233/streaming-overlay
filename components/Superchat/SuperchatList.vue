<template>
  <div v-show="showBanner" class="banner">
    当前没有播放声音的权限。 点击这个页面中的任意一处来允许播放声音。
  </div>
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
      <tr v-for="sc in superchats" :key="sc.id" class="sc-item fadeInLeft">
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
import notificationSound from 'assets/notification.mp3';

const API_URL = import.meta.env.VITE_API_URL;

let loadTimer;
const showBanner = ref(true);
const superchats = ref(await (await fetch(`${API_URL}/superchat/all`)).json());
// sort chronologically desc
superchats.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

onMounted(() => {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
  });
  // click on the page to give permission to play audio
  window.addEventListener('click', () => { showBanner.value = false; });
  // load from backend every 2 seconds
  loadTimer = setInterval(loadSuperchats, 2 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(loadTimer);
});

async function loadSuperchats() {
  try {
    const data = await (await fetch(`${API_URL}/superchat/valid`)).json();
    // put all new superchats in the front
    data.forEach((newSuperchat) => {
      if (superchats.value.every((old) => old.id !== newSuperchat.id)) {
        superchats.value.unshift(newSuperchat);
        showNotification(newSuperchat);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function showNotification(superchat) {
  try {
    // play sound
    const audio = new Audio(notificationSound);
    audio.play();

    // show webAPI notification (doesn't work with http)
    const title = '你有一条新的sc';
    const options = {
      body: `${superchat.belongs_to_user} 发送了一条新的sc`
    };

    const notification = new Notification(title, options);
    setTimeout(() => {
      notification.close();
    }, 5000);
  } catch (error) {
    console.log(error);
  }
}

function formatDate(date) {
  return moment(date).format('YYYY/M/D');
}
</script>

<style lang="scss">
.banner {
  background: #FF4742;
  color: white;
  display: flex;
  font-size: 15px;
  font-weight: 700;
  justify-content: center;
  padding: 10px;
  text-align: center;
  width: 100%;
}

.header {
  font-size: 16pt;
}

.sc-table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  min-width: 800px;
}

.sc-header {
  background: rgb(244 148 57);
  color: white;
  font-weight: bold;
  text-align: left;

  >th:nth-child(1) {
    min-width: 150px;
  }

  >th:nth-child(2) {
    min-width: 75px;
  }
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

.fadeInLeft {
  animation: fadeInLeft;
}
</style>
