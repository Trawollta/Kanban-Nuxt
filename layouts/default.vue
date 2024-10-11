<template>
  <div class="app-layout bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation class="sidebar" />  
    <div class="main-content">
      <ULandingCard>
        <Header />
        <NuxtPage />  
      </ULandingCard>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';
import Header from '~/components/Header.vue';

export default {
  components: {
    Navigation,
    Header,
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  /* Dark Mode Sidebar Farbe */
  background-color: #1a1a1a;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

header {
  padding: 20px;
  text-align: center;
  /* Dark Mode Header */
}

.nuxt-page {
  padding: 20px;
  flex-grow: 1;
}
</style>
