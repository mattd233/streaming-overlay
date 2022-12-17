<template>
  <div>
    <div class="sc fadeInLeft" v-for="sc in scList.slice(0, 1)" v-bind:key="sc.id">
      <div class="upperBox" v-bind:style="calcTitleBg(sc.total_price)">
        <img class="avatar" :src="`https://apic.douyucdn.cn/upload/${sc.avatar}_small.jpg`" alt="avatar"
          loading="lazy" />
        <div class="upperBoxContent">
          <div class="nickname">
            {{ sc.belongs_to_user }}
          </div>
          <div class="price">{{ `￥${parseInt(sc.total_price)}` }}</div>
        </div>
        <div class="timer" v-if="this.countdownString !== '00:00:00'">
          <i class="fa-regular fa-clock"></i>
          &nbsp;{{ countdownString }}
        </div>
      </div>
      <div class="bottomBox" v-bind:style="calcTextBg(sc.total_price)">
        <p class="text">{{ sc.text }}</p>
    </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../service/DataService";
import { options } from "./options";
import { background } from "./background";

export default {
  name: "SuperchatComponent",
  data() {
    return {
      scList: [],
      options: options,
      countdownString: "",
      coundownTimer: "",
      loadTimer: "",
      updateTimer: "",
    };
  },
  props: {},
  methods: {
    loadSCs() {
      DataService.getValidSc()
        .then((response) => {
          // 把新的sc放在list的前面
          let array = response.data;
          for (let i = 0; i < array.length; i++) {
            //如果scList已有这个元素，跳过，否则将它放在sc的第一个
            if (this.scList.some((e) => e.id === array[i].id)) {
              continue;
            } else {
              this.scList.unshift(array[i]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateSc() {
      // if there is only 1 item, don't change anything
      if (this.scList.length <= 1) {
        return;
      }
      // pop the first elment from the list
      const head = this.scList.shift();
      const total_price = head.total_price;
      const secondsElapsed = (Date.now() - Date.parse(head.created_at)) / 1000;
      if (
        total_price < options.sclv2Price &&
        secondsElapsed > options.sclv1LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      } else if (
        total_price < options.sclv3Price &&
        secondsElapsed > options.sclv2LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      } else if (
        total_price < options.sclv4Price &&
        secondsElapsed > options.sclv3LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      } else if (
        total_price < options.sclv5Price &&
        secondsElapsed > options.sclv4LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      } else if (
        total_price < options.sclv6Price &&
        secondsElapsed > options.sclv5LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      } else if (
        total_price >= options.sclv6Price &&
        secondsElapsed > options.sclv6LastingTime
      ) {
        DataService.expireSc(head.id);
        return;
      }
      // push it back if it hasn't expired
      this.scList.push(head);
    },
    // calculate the title background color of sc based on price
    calcTitleBg(price) {
      if (price < options.sclv2Price) {
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
    },
    // calculate the text background color of sc based on price
    calcTextBg(price) {
      if (price < options.sclv2Price) {
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
    },
    setCountdown() {
      const head = this.scList[0];
      const price = head.total_price;
      const ts = head.created_at;
      const secondsElapsed = (Date.now() - Date.parse(ts)) / 1000;
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
      const sec_num = lastingTime - secondsElapsed;
      if (sec_num < 0) {
        this.countdownString = "00:00:00";
        return
      }
      let hours = parseInt(sec_num / 3600) % 24;
      let minutes = parseInt(sec_num / 60) % 60;
      let seconds = parseInt(sec_num) % 60;
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countdownString = `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.loadSCs();
    // refresh every loadInterval seconds
    this.loadTimer = setInterval(this.loadSCs, options.loadInterval * 1000);
    // switch sc every switchInterval seconds
    this.updateTimer = setInterval(
      this.updateSc,
      options.switchInterval * 1000
    );
    this.coundownTimer = setInterval(this.setCountdown, 1000);
  },
  BeforeUnmount() {
    clearInterval(this.loadTimer);
    clearInterval(this.updateTimer);
    clearInterval(this.coundownTimer);
  },
};
</script>

<style scoped>
.sc {
  width: 360px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  align-items: left;
}

.upperBox {
  height: 65px;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  display: flex;
  font-size: 14pt;
  font-weight: bold;
  color: #f2f2f2;
}

.avatar {
  height: 46px;
  width: auto;
  display: inline-block;
  border-radius: 50%;
  padding: 10px;
  border: transparent;
}

.upperBoxContent {
  width: 100%;
  text-align: left;
  margin-top: 8px;
}

.price {
  display: block;
  margin-top: 2px;
}

.timer {
  display: flex;
  color: #e9e9e9;
  margin-top: 40px;
  margin-right: 5px;
  font-size: 12pt;
  font-weight: 500;
}

.bottomBox {
  text-align: left;
  vertical-align: middle;
  border-style: solid;
  border-radius: 0 0 10px 10px;
  border-color: transparent;
}

.text {
  font-size: 14pt;
  line-height: 1.1;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
  color: rgb(65, 65, 65);
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
