<template>
  <div v-if="loadError" class="message">
    我们无法连接到后端。请检查您的互联网连接，或联系客服支持。
  </div>
  <div v-else>
    <div v-for="sc in superchats.slice(0, 1)" :key="sc.id" class="sc fadeInLeft">
      <div class="upperBox" :style="calcTitleBg(sc.total_price)">
        <img class="avatar" :src="`https://apic.douyucdn.cn/upload/${sc.avatar}_small.jpg`" alt="avatar" loading="lazy">
        <div class="upperBoxContent">
          <div class="nickname">
            {{ sc.belongs_to_user }}
          </div>
          <!-- convert to whole number -->
          <div class="price">
            {{ sc.total_price ? `￥${Math.floor(sc.total_price)}` : '' }}
          </div>
        </div>
        <div v-if="countdownString !== '00:00:00'" class="timer">
          <Icon class="icon" name="bi:stopwatch" />
          &nbsp;{{ countdownString }}
        </div>
      </div>
      <div class="bottomBox" :style="calcTextBg(sc.total_price)">
        <p class="text">
          {{ sc.text ? sc.text : '' }}
        </p>
      </div>
    </div>
  </div>
  <div v-if="!haveAudioPermission">
    <button @click="haveAudioPermission = true" class="audioButton">
      点击来允许播放声音
    </button>
  </div>
</template>

<script lang="ts" setup>
import { superchat } from '.prisma/client';

import { background } from './background';
import { options } from './options';
// @ts-ignore
import notificationSound from 'assets/notification.mp3';

const API_URL = import.meta.env.VITE_API_URL;

const superchats = ref<any[]>([]);
const countdownString = ref('');
const haveAudioPermission = ref(false);
const loadError = ref(false);

let coundownTimer: NodeJS.Timer;
let loadTimer: NodeJS.Timer;
let updateTimer: NodeJS.Timer;


async function loadSuperchats(initialLoad = false) {
  try {
    const data = await (await fetch(`${API_URL}/superchat/valid`)).json();
    loadError.value = false;
    // put all new sueprchats on top of the stack
    data.forEach((newSuperchat: superchat) => {
      if (superchats.value.every((old) => old.id !== newSuperchat.id)) {
        superchats.value.unshift(newSuperchat);
        if (!initialLoad) {
          showNotification(newSuperchat);
        }
      }
    });
  } catch (error) {
    loadError.value = true;
    console.log(error);
  }
}

function showNotification(superchat: superchat) {
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
    // do nothing
  }
}

async function expireSuperchat(id: number) {
  await fetch(`${API_URL}/superchat/expire/${id}`);
}

function updateSuperchats() {
  // skip if there is only one
  if (superchats.value.length <= 1) {
    return;
  }

  const head = superchats.value.shift();
  if (!head || head.id === undefined) {
    return;
  }

  const totalPrice = head.total_price !== -1 ? head.total_price : undefined;
  const secondsElapsed = head.created_at ? (Date.now() - Date.parse(head.created_at.toString())) / 1000 : undefined;
  if (!totalPrice || !secondsElapsed) {
    return;
  } else if (
    totalPrice < options.sclv2Price &&
    secondsElapsed > options.sclv1LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  } else if (
    totalPrice < options.sclv3Price &&
    secondsElapsed > options.sclv2LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  } else if (
    totalPrice < options.sclv4Price &&
    secondsElapsed > options.sclv3LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  } else if (
    totalPrice < options.sclv5Price &&
    secondsElapsed > options.sclv4LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  } else if (
    totalPrice < options.sclv6Price &&
    secondsElapsed > options.sclv5LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  } else if (
    totalPrice >= options.sclv6Price &&
    secondsElapsed > options.sclv6LastingTime
  ) {
    expireSuperchat(head.id);
    return;
  }
  // push it back if it hasn't expired
  superchats.value.push(head);
}

// calculate the title background color of the superchat based on price
function calcTitleBg(price: number | null) {
  if (!price) {
    return background.sclv1TitleBg;
  } else if (price < options.sclv2Price) {
    return background.sclv1TitleBg;
  } else if (price < options.sclv3Price) {
    return background.sclv2TitleBg;
  } else if (price < options.sclv4Price) {
    return background.sclv3TitleBg;
  } else if (price < options.sclv5Price) {
    return background.sclv4TitleBg;
  } else if (price < options.sclv6Price) {
    return background.sclv5TitleBg;
  } else if (price >= options.sclv6Price) {
    return background.sclv6TitleBg;
  }
}

// calculate the text background color of ther superchat based on price
function calcTextBg(price: number | null) {
  if (!price) {
    return background.sclv1TextBg;
  } else if (price < options.sclv2Price) {
    return background.sclv1TextBg;
  } else if (price < options.sclv3Price) {
    return background.sclv2TextBg;
  } else if (price < options.sclv4Price) {
    return background.sclv3TextBg;
  } else if (price < options.sclv5Price) {
    return background.sclv4TextBg;
  } else if (price < options.sclv6Price) {
    return background.sclv5TextBg;
  } else if (price >= options.sclv6Price) {
    return background.sclv6TextBg;
  }
}

function setCountdown() {
  const head = superchats.value[0];
  const price = head?.total_price;
  const secondsElapsed = head?.created_at ? (Date.now() - Date.parse(head.created_at.toString())) / 1000 : undefined;

  if (!price) {
    return;
  }
  let lastingTime;
  if (price < options.sclv2Price) {
    lastingTime = options.sclv1LastingTime;
  } else if (price < options.sclv3Price) {
    lastingTime = options.sclv2LastingTime;
  } else if (price < options.sclv4Price) {
    lastingTime = options.sclv3LastingTime;
  } else if (price < options.sclv5Price) {
    lastingTime = options.sclv4LastingTime;
  } else if (price < options.sclv6Price) {
    lastingTime = options.sclv5LastingTime;
  } else if (price >= options.sclv6Price) {
    lastingTime = options.sclv6LastingTime;
  }

  if (!secondsElapsed || !lastingTime) {
    return;
  }
  const remainingSeconds = lastingTime - secondsElapsed;
  if (remainingSeconds < 0) {
    countdownString.value = '00:00:00';
    return;
  }
  const hours = Math.floor(remainingSeconds / 3600) % 24;
  const minutes = Math.floor(remainingSeconds / 60) % 60;
  const seconds = Math.floor(remainingSeconds) % 60;
  const hoursString = hours < 10 ? `0${hours}` : hours.toString();
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
  countdownString.value = `${hoursString}:${minutesString}:${secondsString}`;
}

onMounted(() => {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
  });
  loadSuperchats(true);
  // load from backend every loadInterval seconds
  loadTimer = setInterval(loadSuperchats, options.loadInterval * 1000);
  // switch sc every switchInterval seconds
  updateTimer = setInterval(updateSuperchats, options.switchInterval * 1000);
  coundownTimer = setInterval(setCountdown, 1000);
});

onBeforeUnmount(() => {
  clearInterval(loadTimer);
  clearInterval(updateTimer);
  clearInterval(coundownTimer);
});
</script>

<style lang="scss">
.audioButton {
  background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 800;
  margin-top: 200px;
  min-height: 40px;
  padding: 14px 16px;
  text-align: center;
}

.audioButton:hover,
.audioButton:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.button-24:active {
  opacity: .5;
}

.message {
  display: flex;
  font-size: 20px;
  width: 360px;
}

.sc {
  align-items: left;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  width: 360px;
}

.upperBox {
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  color: #f2f2f2;
  display: flex;
  font-size: 14pt;
  font-weight: bold;
  height: 65px;
}

.avatar {
  border: transparent;
  border-radius: 50%;
  display: inline-block;
  height: 46px;
  padding: 10px;
  width: auto;
}

.upperBoxContent {
  margin-top: 8px;
  text-align: left;
  width: 100%;
}

.price {
  display: block;
  margin-top: 2px;
}

.icon {
  font-size: 16px;
  margin-top: 3px;
}

.timer {
  color: #e9e9e9;
  display: flex;
  font-size: 12pt;
  font-weight: 500;
  margin-right: 5px;
  margin-top: 40px;
}

.bottomBox {
  border-color: transparent;
  border-radius: 0 0 10px 10px;
  border-style: solid;
  min-height: 65px;
  text-align: left;
  vertical-align: middle;
}

.text {
  color: rgb(65, 65, 65);
  font-size: 14pt;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
  word-wrap: break-word;
}

/* animation for entering */
@-webkit-keyframes fadeInLeft {
  0% {
    opacity: 0.4;
    -webkit-transform: translateX(30px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0.4;
    transform: translateX(30px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeInLeft {
  animation: fadeInLeft 0.45s;
}
</style>
