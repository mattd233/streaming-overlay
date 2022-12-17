<template>
  <nav>
    <nuxt-link to="/superchat" class="link">Superchat</nuxt-link> |
    <nuxt-link to="/superchat/list" class="link">Superchat History</nuxt-link> |
    <nuxt-link to="/playlist" class="link">点歌</nuxt-link>
  </nav>
</template>

<style lang="scss">
  nav {
    font-size: 35px;
  }

  .link {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #7de2b8;
    }
  }
</style>