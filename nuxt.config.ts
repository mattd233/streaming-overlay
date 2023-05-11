// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8080
  },
  css: [
    '~/assets/css/main.scss'
  ],
  modules: ['nuxt-icon']
});
