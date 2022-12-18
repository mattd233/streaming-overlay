<template>
  <div class="playlist-component">
    <div class="header">今日歌单</div>
    <span class="date">{{ todayDate() }}</span>
    <div class="song" v-for="song in playlist" v-bind:key="song.id">
      <span>{{ song.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";


let playlist = ref([{
  id: undefined,
  title: undefined
}]);
let timer;

// TODO change to today
async function updatePlaylist() {
  playlist.value = await fetch('http://localhost:3000/api/playlist/all').then(res => res.json());
}

const todayDate = () => {
  let m = moment();
  return m.format("YYYY/M/D");
}

onMounted(() => {
  updatePlaylist();
  timer = setInterval(async() => {
    updatePlaylist();
  }, 5000)
})
</script>

<style lang="scss">
.playlist-component {
  align-items: center;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  width: 100vw;

  >.header {
    font-size: 25pt;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
  }

  >.date {
    font-size: 14pt;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
  }

  >.song {
    align-items: center;
    font-size: 18pt;
    font-weight: bold;
    line-height: 35px;
  }
}
</style>
