<template>
  <div class="playlist-component">
    <h1 class="">今日歌单</h1>
    <p class="date">{{ todayDate() }}</p>
    <div class="playlist-container">
      <div class="song" v-for="song in playlist" v-bind:key="song.id">
        <span>{{ song.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DataService from "../service/DataService";

export default {
  data() {
    return {
      playlist: [],
      timer: "",
    };
  },
  props: {},
  methods: {
    todayDate() {
      let m = moment();
      return m.format("YYYY/M/D");
    },
    
    loadTodayPlaylist() {
      DataService.getAllPlaylist()
        .then((response) => {
          this.playlist = response.data;
          console.log(this.playlist);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancelAutoUpdate() {  
      clearInterval(this.timer);  
    },  
  },
  mounted() {
    this.loadTodayPlaylist();
    // reload every 8 seconds
    this.timer = setInterval(this.loadTodayPlaylist, 8000);
  },
  BeforeUnmount() {  
    this.cancelAutoUpdate();  
  },  
};
</script>

<style scoped>
.playlist-component {
  margin: auto;
  margin-top: 20px;
  /* border-style: solid; */
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
}
h1 {
  font-size: 24pt;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.date {
  font-size: 14pt;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 15px;
  font-weight: bold;
}
.song {
  /* margin: 5px; */
  font-size: 18pt;
  align-items: center;
  height: 100%;
  line-height: 35px;
  height: 35px;
  color: black;
  font-weight: bold;
}
</style>
