export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/tailwindcss','@nuxtjs/color-mode' ],
  compatibilityDate: '2024-10-08',
  plugins: ['~/plugins/firebase.js'],
  colorMode: {
    preference: 'dark'
  }
});